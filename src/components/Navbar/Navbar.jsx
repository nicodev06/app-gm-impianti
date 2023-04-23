import React, { useState, useEffect } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { supabase } from '../../utils/supabase-client';

// style
import './Navbar.css';
import ToggleNavbarIcon from '../../assets/toggle.svg';
import CloseNavbarIcon from '../../assets/close.svg';
import logo from '../../assets/logo-app-gm.png';

import sections from './sections'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const {data: {user}} = await supabase.auth.getUser();
      setCurrentUser(user);
    })()
  }, [])

  if (pathname === '/login'){
    return <></>
  }
    
  return (
    <>
        <div className='app__navbar align-items-center' style={{justifyContent: 'space-between'}}>
            <img src={logo} alt='logo' width={100} height={100} style={{margin: '0.5em'}}/>
            {!isOpen && <img src={ToggleNavbarIcon} alt='navbar-icon' className='app__navbar-icon' onClick={() => {setIsOpen(true)}}/>}
        </div>
        <div className={`app__navbar-menu ${isOpen ? 'toggled' : ''}`}>
            <div className='app__navbar align-items-center'>
                <img src={CloseNavbarIcon} alt='navbar-icon' className='app__navbar-icon delete' onClick={() => {setIsOpen(false)}}/>
            </div>
            {sections.map((section) => {
              if (section.public || currentUser?.user_metadata?.is_admin){
                if (!(currentUser?.user_metadata?.is_admin && section.path === '/buste-paga')){
                  return (
                    <Link to={section.path} onClick={() => {setIsOpen(false)}}>
                      <div className='app__navbar app__navbar-item align-items-center'>
                        <h3 className={`${pathname === section.path ? "selected" : ""}`}>{section.display}</h3>
                      </div>
                    </Link>
                  )
                }
              }
            })}
            {!(currentUser?.user_metadata?.is_admin) && <div 
            className='app__navbar app__navbar-item align-items-center'
            role='button'
            onClick={() => {
              navigate(`riepilogo/${currentUser?.id}?first_name=${currentUser.user_metadata.first_name}&last_name=${currentUser.user_metadata.last_name}`);
              setIsOpen(false);
            }}
            >
              <h3 className={`${pathname.split('/').includes('riepilogo') ? "selected" : ""}`}>RIEPILOGO</h3>
            </div>}
            <div 
            className='app__navbar app__navbar-item align-items-center'
            role='button'
            onClick={() => {supabase.auth.signOut()}}
            >
              <h3>ESCI</h3>
            </div>
        </div>
    </>
  )
}

export default Navbar