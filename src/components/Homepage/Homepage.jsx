import React, { useState, useEffect } from 'react'
import Buttons from './Buttons';

import { Link } from 'react-router-dom';

import HomepageContext from './HomepageContext';

import { supabase } from '../../utils/supabase-client';


// style
import './Homepage.css';

// custom components
import Projects from './Projects';

const Homepage = () => {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      const {data: {user}} = await supabase.auth.getUser();
      setCurrentUser(user);
    })()
  }, [])

  return (
    <HomepageContext>
      <div className='app__layout app__homepage'>
        <div className='app__homepage-topbar align-items-center'>
            <h2>PROGETTI IN CORSO</h2>
            <div className='align-items-center' style={{display: !currentUser?.user_metadata?.is_admin && 'none'}}>
                <Link to='nuovo-progetto'>
                  <button className='add' style={{border: 'none'}}>+</button>
                </Link>
                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>NUOVO</h3>
            </div>
        </div>
        <Projects/>
        <Buttons/>
      </div>
    </HomepageContext>

  )
}

export default Homepage