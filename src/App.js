import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
