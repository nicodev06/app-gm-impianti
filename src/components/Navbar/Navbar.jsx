import React, { useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

// style
import './Navbar.css';
import ToggleNavbarIcon from '../../assets/toggle.svg';
import CloseNavbarIcon from '../../assets/close.svg';

import sections from './sections'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === '/login'){
    return <></>
  }
    
  return (
    <>
        <div className='app__navbar align-items-center'>
            {!isOpen && <img src={ToggleNavbarIcon} alt='navbar-icon' className='app__navbar-icon' onClick={() => {setIsOpen(true)}}/>}
        </div>
        <div className={`app__navbar-menu ${isOpen ? 'toggled' : ''}`}>
            <div className='app__navbar align-items-center'>
                <img src={CloseNavbarIcon} alt='navbar-icon' className='app__navbar-icon delete' onClick={() => {setIsOpen(false)}}/>
            </div>
            {sections.map((section) => {
              return (
                <Link to={section.path} onClick={() => {setIsOpen(false)}}>
                  <div className='app__navbar app__navbar-item align-items-center'>
                    <h3 className={`${pathname === section.path ? "selected" : ""}`}>{section.display}</h3>
                  </div>
                </Link>
              )
            })}
        </div>
    </>
  )
}

export default Navbar