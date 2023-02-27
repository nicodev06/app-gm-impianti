import React from 'react'

import { useParams } from 'react-router-dom';

import eye from '../../assets/eye.svg';

import './Bustepaga.css';

const Bustepaga = () => {

  const { worker } = useParams();
  
  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
  const availableMonths = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio']
  const otherMonths = months.filter((item) => !(availableMonths.includes(item)));
  
  return (
    <div className='app__buste-paga'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>{worker ? "BUSTE PAGA - " + worker : "LE MIE BUSTE PAGA"}</h2>
        </div>
        <div className='app__projects'>
            {availableMonths.map((month) => 
                <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}>{month}</h3>
                <div className='align-items-center item-settings'>
                    <button>
                        <img src={eye} alt="clock" />
                    </button>
                </div>
            </div>
            )}
        </div>
        <div className='app__buste-paga-add align-items-center'>
            <div className='attached-picture'>
                <span>+</span>
            </div>
            <div className='app__buste-paga-choice-month'>
                <select name="selezione mese...">
                    {otherMonths.map((month) => <option value={month}>{month}</option>)}
                </select>
                <h4 style={{fontWeight: 300, marginTop: '0.5rem', padding: 0}}>carica il file in pdf</h4>
            </div>
        </div>
        <div>
            <button className='align-items-center' style={{color: 'white', marginTop: '1rem'}}>
                <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
                <h3>AGGIUNGI BUSTA PAGA</h3>
            </button>
        </div>
    </div>
  )
}

export default Bustepaga