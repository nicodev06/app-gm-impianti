import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

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
 
function App() {

  return (
    <>
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
            <Route path='/crea-rapporto-giornaliero' element={<CreaRapportoGiornaliero/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
