import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Display from './component/Display';

import Template from './component/Template';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Template/>}/>
      {/* <Route path='/Display' element={<Display/>}/> */}
      </Routes>
      </BrowserRouter>
      {/* <Template/>
    <Display/> */}
    </div>
  );
}

export default App;
