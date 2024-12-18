// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './Inventario.css';
import TablaNotas from './TablaNotas';

function Notas() {
  return (
    <div className="container">
      <header className="header bg-primary text-white p-3">
        <h1 className="text-start">Notas</h1>
      </header>
      <main className="mt-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary"><Link to="/addnotas">+ Agrgar Notas</Link></button>
        </div>
        <TablaNotas />
      </main>
    </div>
  );
}

export default Notas;
