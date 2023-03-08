import React from 'react';
import { supabase } from '../../utils/supabase-client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {useNavigate} from 'react-router-dom';

import './Auth.css';

const Login = () => {

  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
        navigate('/')
    }
  })
    
  return (
    <div className='app__login'>
        <header className='auth-header'>
            <Auth
                supabaseClient={supabase}
                theme="dark"
                appearance={{ 
                    theme: ThemeSupa, 
                    className: {
                        button: 'login-button',
                        input: 'login-input'
                    }
                }}
                providers={[]} 
            />
        </header>
    </div>
  )
}

export default Login