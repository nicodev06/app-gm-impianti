import React from 'react'

import './CreaRapportoGiornaliero.css';

import Checkbox from '../Checkbox';

const CreaRapportoGiornaliero = () => {
  return (
    <div className='app__rapporto-giornaliero'>
        <div>
            <h2>CREA RAPPORTO GIORNALIERO</h2>
            <h4 style={{marginTop: '0.5rem'}}>Seleziona i lavoratori ed attribuisci il numero di ore</h4>
        </div>
        <div className='app__raporto-giornaliero-workers'>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 1</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 2</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 3</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 4</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 5</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
            <div className='new-project-checkbox'>
                <div>
                    <Checkbox/>
                    <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 6</h3>
                </div>
                <select>
                    <option disabled selected>ore...</option>
                </select>
            </div>
        </div>
        <div style={{marginTop: '1rem'}}>
            <button className="new-project">
                <h2>CREA RAPPORTO GIORNALIERO</h2>
            </button>
            <p>Le note e le foto generate nel pdf vengono prese dal progetto</p>
        </div>
    </div>
  )
}

export default CreaRapportoGiornaliero