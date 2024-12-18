// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddStudents from './components/Students/AddStudents';
import DeleteStuden from './components/Students/DeleteStuden';
import Students from './components/Students/Students';
import UpdateStudents from './components/Students/UpdateStudents';
import AddTeachers from './components/Teachers/AddTeachers';
import Teachers from './components/Teachers/Teachers';
import UpdateTeachers from './components/Teachers/UpdateTeachers';
import Ventas from './components/Ventas/Ventas';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Students />} /> 
          <Route path="/addstudents" element={<AddStudents />} />
          <Route path="/updatestudents/:id" element={<UpdateStudents />} />
          <Route path="/deletestudents/:id" element={<DeleteStuden />} />
          <Route path="/teacher" element={<Teachers />} />
          <Route path="/addteacher" element={<AddTeachers />} />
          <Route path="/updateteacher/:id" element={<UpdateTeachers />} />
          <Route path="/notas" element={<Ventas />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
