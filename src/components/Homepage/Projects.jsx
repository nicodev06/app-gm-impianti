import React from 'react'

import eye from '../../assets/eye.svg';
import textAlign from '../../assets/text-align.svg';
import settings from '../../assets/settings.svg';

const Projects = () => {
  return (
    <div className='app__projects'>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>progetto 1</h3>
            <div className='align-items-center item-settings'>
                <button>
                  <img src={eye} alt="eye" />
                </button>
                <button>
                  <img src={textAlign} alt="text-align" />
                </button>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>progetto 2</h3>
            <div className='align-items-center item-settings'>
                <button>
                  <img src={eye} alt="eye" />
                </button>
                <button>
                  <img src={textAlign} alt="text-align" />
                </button>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>progetto 3</h3>
            <div className='align-items-center item-settings'>
                <button>
                  <img src={eye} alt="eye" />
                </button>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>progetto 4</h3>
            <div className='align-items-center item-settings'>
                <button>
                  <img src={eye} alt="eye" />
                </button>
                <button>
                  <img src={textAlign} alt="text-align" />
                </button>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
        <div className='app__projects-item align-items-center'>
            <h3 style={{ fontWeight: 300}}>progetto 5</h3>
            <div className='align-items-center item-settings'>
                <button>
                  <img src={eye} alt="eye" />
                </button>
                <button>
                  <img src={settings} alt="settings" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Projects