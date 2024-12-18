import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Productos.css';

function EliminarEstudiante() {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirección
  const { id } = useParams(); // Extraer el ID desde la URL

  // Función para obtener el token CSRF
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

  // Función para manejar la eliminación
  const handleDelete = () => {
    // Confirmación antes de eliminar
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (!confirmDelete) {
      return; // Si cancela, no hacer nada
    }

    fetch(`http://127.0.0.1:9000/estudiante/${id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'), // Token CSRF
      },
    })
      .then(response => {
        if (!response.ok) {
          // Capturar el error enviado desde el servidor
          return response.json().then(errData => {
            throw new Error(errData.detail || 'Error al eliminar el estudiante');
          });
        }
        setError(null); // Limpiar errores si fue exitoso
        alert('Estudiante eliminado correctamente');
        navigate('/tablaestudiantes'); // Redirigir a la lista de estudiantes
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message); // Mostrar mensaje de error
      });
  };

  return (
    <div className="container">
      <header className="header bg-danger text-white p-3">
        <h1 className="text-start">Eliminar Estudiante</h1>
      </header>
      <main className="mt-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <p>¿Estás seguro de que deseas eliminar al estudiante con ID {id}?</p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Confirmar Eliminación
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate('/tablaestudiantes')}>
          Cancelar
        </button>
      </main>
    </div>
  );
}

export default EliminarEstudiante;
