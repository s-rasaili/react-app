// src/components/Navigation.jsx
import React from 'react';
import './HeroComponent.css';

export function HeroComponent() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold text-success mb-4">
              Welcome to Bharat Agrolink
            </h1>
            <p className="lead text-muted mb-4">
              Your trusted partner for quality agricultural products, seeds, 
              fertilizers, and crop protection solutions across India.
            </p>
            <div className="d-flex gap-3">
              <a href="#products" className="btn btn-success btn-lg px-4">
                Browse Products
              </a>
              <a href="#contact" className="btn btn-outline-success btn-lg px-4">
                Contact Us
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Agriculture" 
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
   
}