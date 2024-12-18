import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventario.css';

function NuevaNota() {
  const [formData, setFormData] = useState({
    nombre: '',
    estudiante: '',
    profesor: '',
    nota: '',
  });

  const [estudiantes, setEstudiantes] = useState([]); // Lista de estudiantes
  const [profesores, setProfesores] = useState([]); // Lista de profesores
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  // Cargar estudiantes y profesores al montar el componente
  useEffect(() => {
    fetchEstudiantes();
    fetchProfesores();
  }, []);

  const fetchEstudiantes = () => {
    fetch('http://127.0.0.1:9000/estudiante/')
      .then((response) => response.json())
      .then((data) => setEstudiantes(data))
      .catch((err) => setError('Error al cargar estudiantes.'));
  };

  const fetchProfesores = () => {
    fetch('http://127.0.0.1:9000/profesor/')
      .then((response) => response.json())
      .then((data) => setProfesores(data))
      .catch((err) => setError('Error al cargar profesores.'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre: formData.nombre,
      estudiante: formData.estudiante,
      profesor: formData.profesor,
      nota: formData.nota,
    };

    fetch('http://127.0.0.1:9000/notas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.error || 'Error al guardar la nota');
          });
        }
        return response.json();
      })
      .then(() => {
        setSuccess(true);
        setError(null);
        setFormData({ nombre: '', estudiante: '', profesor: '', nota: '' });
        navigate('/notas'); // Redirigir a la lista de notas
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
      });
  };

  // Función para obtener el token CSRF
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
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
        <h1 className="text-start">Nueva Nota</h1>
      </header>
      <main className="mt-4">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              Nota guardada exitosamente
            </div>
          )}

          {/* Nombre de la Nota */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nota</label>
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

          {/* Seleccionar Estudiante */}
          <div className="mb-3">
            <label htmlFor="estudiante" className="form-label">Estudiante</label>
            <select
              className="form-control"
              id="estudiante"
              name="estudiante"
              value={formData.estudiante}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map((estudiante) => (
                <option key={estudiante.id} value={estudiante.id}>
                  {estudiante.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Seleccionar Profesor */}
          <div className="mb-3">
            <label htmlFor="profesor" className="form-label">Profesor</label>
            <select
              className="form-control"
              id="profesor"
              name="profesor"
              value={formData.profesor}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Nota */}
          <div className="mb-3">
            <label htmlFor="nota" className="form-label">Nota</label>
            <input
              type="number"
              className="form-control"
              id="nota"
              name="nota"
              value={formData.nota}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Guardar Nota</button>
        </form>
      </main>
    </div>
  );
}

export default NuevaNota;
