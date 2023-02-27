import React from 'react'

import { useParams } from 'react-router-dom';

import eye from '../../assets/eye.svg';

import './ReportOre.css';

const ReportOre = () => {

  const { worker } = useParams();
    
  return (
    <div className='app__report-ore'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>REPORT ORE - {worker}</h2>
        </div>
        <div className='app__projects'>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>160h</span> - gennaio</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>120h</span> - febbraio</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>180h</span> - marzo</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>150h</span> - aprile</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
        </div>
        <div style={{marginTop: '3rem'}}>
            <h2 style={{textTransform: 'uppercase'}}>ORE PROGETTO - {worker}</h2>
        </div>
        <div className='app__projects'>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>60h</span> - progetto1</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>20h</span> - progetto2</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>80h</span> - progetto3</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>50h</span> - progetto4</h3>
                <div className='align-items-center item-settings'>
                    <button>
                    <img src={eye} alt="settings" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportOre