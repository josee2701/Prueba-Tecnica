import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Inventario.css';

function EditarStudents() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',

  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:9000/profesor/${id}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setFormData({
            nombre: data.nombre,
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
    data.append('nombre', formData.nombre);

    const url = id ? `http://127.0.0.1:9000/profesor/${id}/` : 'http://127.0.0.1:9000/profesor/';
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
        nombre: '',
      });
      // Redirigir a la lista de estudiantes
      navigate('/teacher');
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
        <h1 className="text-start">{id ? 'Editar Students' : 'Nuevo Students'}</h1>
      </header>
      <main className="mt-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && <div className="alert alert-danger" role="alert">Error: {error.message}</div>}
          {success && <div className="alert alert-success" role="alert">Estudiante {id ? 'actualizado' : 'agregado'} exitosamente</div>}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">{id ? 'Guardar cambios' : 'Agregar Productp'}</button>
        </form>
      </main>
    </div>
  );
}

export default EditarStudents;
