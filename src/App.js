import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import NewProject from './components/NewProject/NewProject';
import ProjectPage from './components/ProjectPage/ProjectPage';
import Workers from './components/Workers/Workers';
import Bustepaga from './components/Bustepaga/Bustepaga';
import ReportOre from './components/ReportOre/ReportOre';
import UpdateHours from './components/UpdateHours/UpdateHours';
import CreaRapporto from './components/CreaRapporto/CreaRapporto';
import CreaRapportoGiornaliero from './components/CreaRapportoGiornaliero/CreaRapportoGiornaliero';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path='/nuovo-progetto' element={<NewProject/>}/>
          <Route path='/progetto' element={<ProjectPage/>}/>
          <Route path='/lavoratori' element={<Workers/>}/>
          <Route path='/buste-paga' element={<Bustepaga/>}/>
          <Route path='/buste-paga/:worker' element={<Bustepaga/>}/>
          <Route path='/report-ore/:worker' element={<ReportOre/>}/>
          <Route path='/aggiorna-ore' element={<UpdateHours/>}/>
          <Route path='/crea-rapporto' element={<CreaRapporto/>}/>
          <Route path='/crea-rapporto-giornaliero' element={<CreaRapportoGiornaliero/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
