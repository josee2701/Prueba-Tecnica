// src/TablaVentas.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function TablaVentas() {
  const [ventas, setventas] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetch('http://127.0.0.1:9000/notas/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setventas(data))
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
              Error al cargar los productos: {error.message}
            </td>
          </tr>
        ) : (ventas.map(ventas => (
          <tr key={ventas.id}>
            <td>{ventas.id}</td>
            <td>{ventas.cliente}</td>
            <td>{ventas.producto_nombre}</td>
            <td>{ventas.cantidad}</td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  );
}

export default TablaVentas;
