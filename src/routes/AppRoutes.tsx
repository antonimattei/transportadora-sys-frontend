import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login.tsx'; // ou o caminho correto para o seu componente Login
import Dashboard from '../components/Dashboard.tsx'; // ou o caminho correto para o seu componente Login

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Adicione outras rotas aqui */}
    </Routes>
  );
};

export default AppRoutes;