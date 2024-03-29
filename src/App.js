import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
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
import Login from './components/Auth/Login';
import Pdf from './components/Pdf/Pdf';
import Documenti from './components/Documenti/Documenti';
import Riepilogo from './components/ReportOre/Riepilogo';
 
function App() {

  return (
    <>
      <input type='hidden' value='' id='rapporto-giornaliero-value'/>
      <BrowserRouter>
        <Navbar/>
        <Layout>
          <Routes>
            <Route index element={<Homepage/>}/>
            <Route path='/nuovo-progetto' element={<NewProject/>}/>
            <Route path='/progetto/:id' element={<ProjectPage/>}/>
            <Route path='/progetto/:id/pdf' element={<Pdf/>}/>
            <Route path='/lavoratori' element={<Workers/>}/>
            <Route path='/buste-paga' element={<Bustepaga/>}/>
            <Route path='/buste-paga/:worker' element={<Bustepaga/>}/>
            <Route path='/report-ore/:worker' element={<ReportOre/>}/>
            <Route path='/aggiorna-ore' element={<UpdateHours/>}/>
            <Route path='/crea-rapporto' element={<CreaRapporto/>}/>
            <Route path='/crea-rapporto-giornaliero/:id' element={<CreaRapportoGiornaliero/>}/>
            <Route path='/documenti/:id' element={<Documenti/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/riepilogo/:worker' element={<Riepilogo/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
