import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import NewProject from './components/NewProject/NewProject';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path='/nuovo-progetto' element={<NewProject/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
