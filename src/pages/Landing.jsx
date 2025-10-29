import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing">
      <h1>Greenhouse Co.</h1>
      <p>We bring the beauty of nature to your home with our curated collection of houseplants.</p>
      <Link to="/products" className="btn">Get Started</Link>
    </div>
  );
}
