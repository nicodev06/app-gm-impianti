import React from 'react'
import './ProjectPage.css';

const ProjectPage = () => {
  return (
    <div className='app__project-page'>
        <div>
            <h2>TITOLO PROGETTO</h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>descrizione del progetto</h4>
            <h2>LAVORATORI: </h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>lavoratore1, lavoratore2</h4>
        </div>
        <div className='app__new-project-inputs'>
            <textarea placeholder='Inserisci note testuali'  style={{height: '20vh'}} />
        </div>
        <div>
            <h2>FOTO ALLEGATA</h2>
            <div className='attached-picture'>
                <span>+</span>
            </div>
        </div>
        <div style={{marginTop: '1rem'}}>
            <button className='new-project'>
                <h3>INSERISCI ORE</h3>
            </button>
            <button className='new-project'>
                <h3>CREA RAPPORTO COMPLESSIVO</h3>
            </button>
            <button className='new-project'>
                <h3>CREA RAPPORTO GIORNALIERO</h3>
            </button>
        </div>
    </div>
  )
}

export default ProjectPage