import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Template from './component/Template';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Template/>}/>
      
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
