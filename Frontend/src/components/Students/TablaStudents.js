// src/TablaProductos.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9000/estudiante/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProductos(data))
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
              Error al cargar los productos: {error.message}
            </td>
          </tr>
        ) : (
          productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>

              <td>
                <Link to={`/updateproducto/${producto.id}`}>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-pen"></i>
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

export default TablaProductos;
