// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './Productos.css';
import TablaStudents from './TablaStudents';

function Productos() {
  return (
    <div className="container">
      <header className="header bg-primary text-white p-3">
        <h1 className="text-start">Estudiantes</h1>
      </header>
      <main className="mt-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary"><Link to="/addproducto">+ Agregar Estudiante</Link></button>
        </div>
        <TablaStudents />
      </main>
    </div>
  );
}

export default Productos;
