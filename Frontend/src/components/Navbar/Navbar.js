// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Students</Link>
        </li>
        <li>
          <Link to="/teacher">Teachers</Link>
        </li>
        <li>
          <Link to="/notas">Note</Link>
        </li>
      </ul>
      
    </nav>
  );
}
export default Navbar;
