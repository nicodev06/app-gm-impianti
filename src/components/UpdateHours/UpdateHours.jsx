import React from 'react'

import './UpdateHours.css';

const UpdateHours = () => {
  return (
    <div className='app__update-hours'>
      <div>
        <h2>AGGIUNGI ORE</h2>
      </div>
      <div>
        <select style={{width: '100%'}}>
        <option  disabled selected>Seleziona progetto...</option>
        </select>
      </div>
      <div style={{marginTop: '1rem'}}>
        <div className='align-items-center' style={{width: '100%', justifyContent: 'space-between'}}>
          <h3 style={{fontWeight: 500}}>Seleziona il giorno</h3>
          <select></select>
        </div>
        <div className='align-items-center' style={{width: '100%', justifyContent: 'space-between'}}>
          <h3 style={{fontWeight: 500}}>Numero di ore lavorate</h3>
          <select></select>
        </div>
      </div>
      <div style={{marginTop: '1rem'}}>
        <button className='align-items-center' style={{color: '#fff'}}>
            <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
            <h3 style={{fontWeight: 600}}>AGGIUNGI ORE</h3>
        </button>
        <h4 style={{fontWeight: 300, marginTop: '0.5rem'}}>Le ore aggiunte saranno visibili all'interno del progetto e si andranno a sommare alle tue ore mensili</h4>
      </div>
    </div>
  )
}

export default UpdateHours