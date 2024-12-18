// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddProducto from './components/Students/AddProductos';
import Students from './components/Students/Students';
import UpdateProducto from './components/Students/UpdateProductos';
import AddStock from './components/Teachers/AddStock';
import Teachers from './components/Teachers/Teachers';
import UpdateStock from './components/Teachers/UpdateStock';
import Ventas from './components/Ventas/Ventas';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Students />} /> 
          <Route path="/addstudents" element={<AddProducto />} />
          <Route path="/updatestudents/:id" element={<UpdateProducto />} />
          <Route path="/teacher" element={<Teachers />} />
          <Route path="/addteacher" element={<AddStock />} />
          <Route path="/updateteacher/:id" element={<UpdateStock />} />
          <Route path="/notas" element={<Ventas />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
