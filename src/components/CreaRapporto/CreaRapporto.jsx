import React from 'react'

import { Link } from 'react-router-dom';

import './CreaRapporto.css'

const CreaRapporto = () => {
  return (
    <div className='app__crea-rapporto'>
        <div className='select-project'>
            <h2>CREA RAPPORTO</h2>
            <select>
                <option  disabled selected>Seleziona progetto...</option>
            </select>
        </div>
        <div style={{marginTop: '4rem'}}>
            <button className="new-project">
                <h2>CREA RAPPORTO COMPLESSIVO</h2>
            </button>
            <Link to='/crea-rapporto-giornaliero'>
                <button className="new-project">
                    <h2>CREA RAPPORTO GIORNALIERO</h2>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default CreaRapporto