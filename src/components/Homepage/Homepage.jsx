import React from 'react'

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
                <button className='add'>+</button>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>NUOVO</h3>
            </div>
        </div>
        <Projects/>
    </div>
  )
}

export default Homepage