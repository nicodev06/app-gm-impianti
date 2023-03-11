import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

import Popup from '../Popup';
import CreateWorker from './CreateWorker';
import UpdateWorker from './UpdateWorker';

import './Workers.css';
import clock from '../../assets/clock.svg';
import euro from '../../assets/euro.svg';
import settings from '../../assets/settings.svg';

import { supabase } from '../../utils/supabase-client';

const Workers = () => {

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");
  const [workers, setWorkers] = useState([]);
  const [currentWorker, setCurrentWorker] = useState(null); 

  useEffect(() => {
    supabase.functions.invoke('list-users', {
      body: {}
    }).then(({ data }) => {
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

  const handleClose = () => {
    supabase.functions.invoke('list-users', {}).then(({ data }) => {
      setWorkers(data?.users);
      setShowPopUp(false);
    });
  }


  return (
    <div className='app__workers'>
      <div className='app__homepage-topbar align-items-center'>
        <h2>LAVORATORI</h2>
        <div className='align-items-center'>
          <button className='add' style={{border: 'none'}} onClick={() => {
            setPopUpContent("");
            setShowPopUp(true);
          }}
          >+</button>
          <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>NUOVO</h3>
        </div>
      </div>
      <div className='app__projects'>
        {workers.map((worker) => {
          return (
            <div className='app__projects-item align-items-center'>
              <div style={{display: 'block',width: '50%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                <h3 style={{fontWeight: 300, width: '100%'}}>{worker.email}</h3>
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
                  <button onClick={() => {
                    setPopUpContent('update');
                    setCurrentWorker(worker);
                    setShowPopUp(true);
                  }}>
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
        onClick={() => {
          setPopUpContent("");
          setShowPopUp(true);
        }}
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
        {popUpContent === "update" ? <UpdateWorker currentWorker={currentWorker} handleClose={handleClose}/> : <CreateWorker handleClose={handleClose}/>}
      </Popup>
      }
    </div>
  )
}

export default Workers