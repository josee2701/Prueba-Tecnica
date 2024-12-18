import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Inventario.css';

function EditarProducto() {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: ''
  });

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Cargar productos para el dropdown
    fetch('http://localhost:9000/api/products/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => setError(error));
  }, []);

  useEffect(() => {
    if (id) {
      // Cargar datos del producto si estamos en modo de edición
      fetch(`http://localhost:9000/api/stock/${id}/`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            producto: data.producto,
            cantidad: data.cantidad
          });
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
          setError(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('producto', formData.producto);
    data.append('cantidad', formData.cantidad);

    const url = id ? `http://localhost:9000/api/stock/${id}/` : 'http://localhost:9000/api/stock/';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: data,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccess(true);
      setFormData({
        producto: '',
        cantidad: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error);
    });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className="container">
      <header className="header bg-primary text-white p-3">
        <h1 className="text-start">{id ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      </header>
      <main className="mt-4">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">Error: {error.message}</div>}
          {success && <div className="alert alert-success" role="alert">Producto {id ? 'actualizado' : 'agregado'} exitosamente</div>}
          <div className="mb-3">
            <label htmlFor="producto" className="form-label">Producto</label>
            <select
              className="form-control"
              id="producto"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? 'Guardar cambios' : 'Agregar Producto'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditarProducto;
