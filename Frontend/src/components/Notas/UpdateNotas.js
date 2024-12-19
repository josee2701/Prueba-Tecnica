import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Inventario.css';

function EditarNota() {
  const { id } = useParams(); // ID de la nota
  const navigate = useNavigate(); // Redirección
  const [formData, setFormData] = useState({
    nombre: '',
    estudiante: '',
    profesor: '',
    nota: '',
  });

  const [estudiantes, setEstudiantes] = useState([]); // Lista de estudiantes
  const [profesores, setProfesores] = useState([]);   // Lista de profesores
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cargar estudiantes, profesores y datos de la nota al montar
  useEffect(() => {
    fetchEstudiantes();
    fetchProfesores();
    if (id) {
      fetchNota();
    }
  }, [id]);

  const fetchEstudiantes = () => {
    fetch('http://127.0.0.1:9000/estudiante/')
      .then(response => response.json())
      .then(data => setEstudiantes(data))
      .catch(() => setError('Error al cargar estudiantes'));
  };

  const fetchProfesores = () => {
    fetch('http://127.0.0.1:9000/profesor/')
      .then(response => response.json())
      .then(data => setProfesores(data))
      .catch(() => setError('Error al cargar profesores'));
  };

  const fetchNota = () => {
    fetch(`http://127.0.0.1:9000/notas/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar la nota');
        return response.json();
      })
      .then(data => {
        setFormData({
          nombre: data.nombre,
          estudiante: data.estudiante,
          profesor: data.profesor,
          nota: data.nota,
        });
      })
      .catch(() => setError('Error al cargar la nota'));
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

    const url = id
      ? `http://127.0.0.1:9000/notas/${id}/` // Actualizar nota
      : 'http://127.0.0.1:9000/notas/'; // Crear nota nueva

    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(errData.error || 'Error al guardar la nota');
          });
        }
        return response.json();
      })
      .then(() => {
        setSuccess(true);
        setError(null);
        navigate('/notas'); // Redirigir a la lista de notas
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

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
        <h1 className="text-start">{id ? 'Editar Nota' : 'Nueva Nota'}</h1>
      </header>
      <main className="mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Nota guardada exitosamente</div>}

        <form onSubmit={handleSubmit}>
          {/* Nombre de la nota */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Detalle</label>
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

          {/* Seleccionar estudiante */}
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
              {estudiantes.map(est => (
                <option key={est.id} value={est.id}>{est.nombre}</option>
              ))}
            </select>
          </div>

          {/* Seleccionar profesor */}
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
              {profesores.map(prof => (
                <option key={prof.id} value={prof.id}>{prof.nombre}</option>
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

          <button type="submit" className="btn btn-primary">
            {id ? 'Guardar cambios' : 'Agregar Nota'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditarNota;
