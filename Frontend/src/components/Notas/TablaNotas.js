// src/TablaNotas.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function TablaNotas() {
  const [notas, setnotas] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch('http://127.0.0.1:9000/notas/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setnotas(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Estudiante</th>
          <th>Profersor</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="5" className="text-center text-danger">
              Error al cargar las notas: {error.message}
            </td>
          </tr>
        ) : (notas.map(notas => (
          <tr key={notas.id}>
            <td>{notas.id}</td>
            <td>{notas.estudiante_nombre}</td>
            <td>{notas.profesor_nombre}</td>
            <td>{notas.nota}</td>
            <td>
              <Link to={`/updatenotas/${notas.id}`}>
                <button className="btn btn-primary">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </Link>
              <Link to={`/deletenotas/${notas.id}`}>
                <button className="btn btn-danger ">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </Link>
            </td>
          </tr>
        ))
        )}
      </tbody>
    </table>
  );
}

export default TablaNotas;
