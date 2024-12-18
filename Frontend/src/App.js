// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddNotas from './components/Notas/AddNotas';
import DeleteNotas from './components/Notas/DeleteNotas';
import Notas from './components/Notas/Notas';
import UpdateNotas from './components/Notas/UpdateNotas';
import AddStudents from './components/Students/AddStudents';
import DeleteStuden from './components/Students/DeleteStuden';
import Students from './components/Students/Students';
import UpdateStudents from './components/Students/UpdateStudents';
import AddTeachers from './components/Teachers/AddTeachers';
import DeleteTeachers from './components/Teachers/DeleteTeachers';
import Teachers from './components/Teachers/Teachers';
import UpdateTeachers from './components/Teachers/UpdateTeachers';


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
          <Route path="/deleteteacher/:id" element={<DeleteTeachers />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/addnotas" element={<AddNotas />} />
          <Route path="/updatenotas/:id" element={<UpdateNotas />} />
          <Route path="/deletenotas/:id" element={<DeleteNotas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
