// src/components/Navigation.jsx
import React from 'react';
import './navbar.css';

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            {/* Brand/Logo */}
            <a className="navbar-brand fw-bold" href="#home">
              Bharat Agrolink
            </a>
    
            {/* Toggler/Hamburger Button for Mobile */}
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
    
            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#products">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
   
}