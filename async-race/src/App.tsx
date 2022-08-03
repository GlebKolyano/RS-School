import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import Garage from './pages/Garage';
import NotFound from './pages/NotFound';
import Winners from './pages/Winners';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Garage />} />
          <Route path="winners" element={<Winners />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
