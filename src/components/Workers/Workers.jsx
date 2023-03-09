import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

import Popup from '../Popup';
import CreateWorker from './CreateWorker';

import './Workers.css';
import clock from '../../assets/clock.svg';
import euro from '../../assets/euro.svg';
import settings from '../../assets/settings.svg';

import { supabase } from '../../utils/supabase-client';

const Workers = () => {

  const [showPopUp, setShowPopUp] = useState(false);
  const [workers, setWorkers] = useState([]); 

  useEffect(() => {
    supabase.functions.invoke('list-users', {}).then(({ data }) => {
      setWorkers(data?.users);
    })
  }, [])

  if (workers?.length === 0){ 
    return (
      <div className='loading'>
        <h2>CARICAMENTO...</h2>
      </div>
    )
  }


  return (
    <div className='app__workers'>
      <div className='app__homepage-topbar align-items-center'>
        <h2>LAVORATORI</h2>
        <div className='align-items-center'>
          <button className='add' style={{border: 'none'}}>+</button>
          <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>NUOVO</h3>
        </div>
      </div>
      <div className='app__projects'>
        {workers.map((worker) => {
          return (
            <div className='app__projects-item align-items-center'>
              <div>
                <h3 style={{ fontWeight: 300}}>{worker.email}</h3>
              </div>
              <div className='align-items-center item-settings'>
                  <Link to={'/report-ore/lavoratore1'}>
                    <button>
                      <img src={clock} alt="clock" />
                    </button>
                  </Link>
                  <Link to='/buste-paga/lavoratore1'>
                    <button>
                      <img src={euro} alt="euro" />
                    </button>
                  </Link>
                  <button>
                    <img src={settings} alt="settings" />
                  </button>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <button 
        className='new-worker'
        onClick={() => {setShowPopUp(true)}}
        >
          <button 
          className='add' 
          style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}
          >+</button>
          <h2>AGGIUNGI NUOVO LAVORATORE</h2>
        </button>
      </div>
      {showPopUp && 
      <Popup handleClose={() => {setShowPopUp(false)}}>
        <CreateWorker handleClose={() => {setShowPopUp(false)}}/>
      </Popup>
      }
    </div>
  )
}

export default Workers