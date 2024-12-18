import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './Inventario.css';

function Productos() {
  const [formData, setFormData] = useState({
    producto: '', // Asegúrate de que 'producto' esté vacío por defecto
    cantidad: ''
  });

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch products to populate the select dropdown
  useEffect(() => {
    fetch('http://localhost:9000/api/products/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => setError(error));
  }, []);

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

    fetch('http://localhost:9000/api/stock/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),  // Aquí se incluye el token CSRF
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

  // Función para obtener el token CSRF de las cookies
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
        <h1 className="text-start">Nuevo Producto en Stock</h1>
      </header>
      <main className="mt-4">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">Error: {error.message}</div>}
          {success && <div className="alert alert-success" role="alert">Producto agregado exitosamente al stock</div>}
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
          <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
      </main>
    </div>
  );
}

export default Productos;
