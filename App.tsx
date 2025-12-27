import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import UnitPage from './pages/UnitPage';
import Academy from './pages/Academy';

// Using HashRouter as requested in constraints (no server config required)
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rota raiz do catálogo -> Seleção de Unidade */}
        <Route path="/catalogo" element={<Catalog />} />
        {/* Rota específica da unidade -> Lista de Serviços */}
        <Route path="/catalogo/:citySlug" element={<Catalog />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/unidade/:slug" element={<UnitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;