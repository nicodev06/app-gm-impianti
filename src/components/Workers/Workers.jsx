import React from 'react'

import { Link } from 'react-router-dom';

import './Workers.css';
import clock from '../../assets/clock.svg';
import euro from '../../assets/euro.svg';
import settings from '../../assets/settings.svg';

const Workers = () => {
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
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>lavoratore 1</h3>
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
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>lavoratore 2</h3>
            <div className='align-items-center item-settings'>
                <Link to={'/report-ore/lavoratore2'}>
                  <button>
                    <img src={clock} alt="clock" />
                  </button>
                </Link>
                <Link to='/buste-paga/lavoratore2'>
                  <button>
                    <img src={euro} alt="euro" />
                  </button>
                </Link>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>lavoratore 3</h3>
            <div className='align-items-center item-settings'>
                <Link to={'/report-ore/lavoratore3'}>
                  <button>
                    <img src={clock} alt="clock" />
                  </button>
                </Link>
                <Link to='/buste-paga/lavoratore3'>
                  <button>
                    <img src={euro} alt="euro" />
                  </button>
                </Link>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>lavoratore 4</h3>
            <div className='align-items-center item-settings'>
                <Link to={'/report-ore/lavoratore4'}>
                  <button>
                    <img src={clock} alt="clock" />
                  </button>
                </Link>
                <Link to='/buste-paga/lavoratore4'>
                  <button>
                    <img src={euro} alt="euro" />
                  </button>
                </Link>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>lavoratore 5</h3>
            <div className='align-items-center item-settings'>
                <Link to={'/report-ore/lavoratore5'}>
                  <button>
                    <img src={clock} alt="clock" />
                  </button>
                </Link>
                <Link to='/buste-paga/lavoratore5'>
                  <button>
                    <img src={euro} alt="euro" />
                  </button>
                </Link>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
      </div>
      <div>
        <button className='new-worker'>
          <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
          <h2>AGGIUNGI NUOVO LAVORATORE</h2>
        </button>
      </div>
    </div>
  )
}

export default Workers