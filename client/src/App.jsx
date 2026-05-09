import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
