import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

function Estudiante() {
  const [formData, setFormData] = useState({
    nombre: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

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

    fetch('http://127.0.0.1:9000/estudiante/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'), // Token CSRF
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
        setError(null); // Limpiar errores
        setFormData({
          nombre: '',
        });
        // Redirigir a la lista de estudiantes
        navigate('/');
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
        <h1 className="text-start">Nuevo Estudiante</h1>
      </header>
      <main className="mt-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && (
            <div className="alert alert-danger" role="alert">
              Error al agregar al estudiante: {error.message}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              Estudiante agregado exitosamente
            </div>
          )}
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
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </main>
    </div>
  );
}

export default Estudiante;
