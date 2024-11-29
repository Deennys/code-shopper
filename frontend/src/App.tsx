import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Travel from './pages/Travel/Index';
import History from './pages/History/Index';


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viagem" element={<Travel />} />
        <Route path="/historico" element={<History />} />4
      </Routes>
    </div>
  );
};

export default App;
