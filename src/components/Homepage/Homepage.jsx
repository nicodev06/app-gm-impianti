import React from 'react'
import Buttons from './Buttons';

import { Link } from 'react-router-dom';

// style
import './Homepage.css';

// custom components
import Projects from './Projects';

const Homepage = () => {
  return (
    <div className='app__layout app__homepage'>
        <div className='app__homepage-topbar align-items-center'>
            <h2>PROGETTI IN CORSO</h2>
            <div className='align-items-center'>
                <Link to='nuovo-progetto'>
                  <button className='add' style={{border: 'none'}}>+</button>
                </Link>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>NUOVO</h3>
            </div>
        </div>
        <Projects/>
        <Buttons/>
    </div>
  )
}

export default Homepage