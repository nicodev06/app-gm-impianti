import React from 'react'

import './NewProject.css';

// custom components
import Checkbox from '../Checkbox';

const NewProject = () => {
  return (
    <div className='app__new-project'>
        <div className='app__new-project-bar'>
            <h2 style={{color: '#fff'}}>NUOVO PROGETTO</h2>
        </div>
        <div className='app__new-project-inputs'>
            <input type="text" placeholder='titolo del progetto'/>
            <textarea placeholder='descrizione...'  style={{height: '20vh'}} />
        </div>
        <div>
            <h2 style={{color: '#fff', marginBottom: 0, marginTop: '1.5rem'}}>ASSEGNA IL LAVORO A:</h2>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 1</h3>
            </div>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 2</h3>
            </div>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 3</h3>
            </div>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 4</h3>
            </div>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 5</h3>
            </div>
            <div className='new-project-checkbox'>
                <Checkbox/>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>lavoratore 6</h3>
            </div>
        </div>
        <div>
            <button className='new-project'>
                <h2>CREA PROGETTO</h2>
            </button>
        </div>
    </div>
  )
}

export default NewProject