import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import { supabase } from '../utils/supabase-client';

const Layout = ({ children }) => {

  const navigate = useNavigate();  

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
        if (data.session === null){
            navigate('/login');
        }
    })
  }, [])
    
  return (
    <div>
        { children }
    </div>
  )
}

export default Layout