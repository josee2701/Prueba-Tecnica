// src/TablaStudents.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TablaStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:9000/estudiante/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStudents(data))
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
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="5" className="text-center text-danger">
              Error al cargar a los estudiantes: {error.message}
            </td>
          </tr>
        ) : (
          students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.nombre}</td>

              <td>
                <Link to={`/updatestudents/${student.id}`}>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </Link>
                <Link to={`/deletestudents/${student.id}`}>
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

export default TablaStudents;
