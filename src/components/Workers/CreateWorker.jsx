import React, { useState, useEffect } from 'react'

import { supabase } from '../../utils/supabase-client';

const CreateWorker = ({ handleClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const create = () => {
    if (email.length > 0 && password.length > 0){
        supabase.functions.invoke('create-worker', {
            body: {email, password},
        }).then(() => {
            setLoading(false);
            handleClose();
        })
        setLoading(true);
    }
  }
    
  return (
    <div className='create-worker'>
        <div className='align-items-center' style={{borderBottom: '1px solid var(--gray-color)'}}>
            <h2>AGGIUNGI NUOVO LAVORATORE</h2>
        </div>
        <div>
            <p>Email:</p>
            <input type="email" placeholder='email' className='login-input' onChange={(e) => {setEmail(e.target.value)}}/>
            <p>Password:</p>
            <input type="password" placeholder='password' className='login-input' onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className='align-items-center' style={{marginTop: '2rem'}}>
            <button className='green-button' onClick={create}>
                <h3>{loading ? 'CARICAMENTO...' : 'CREA'}</h3>
            </button>
        </div>
    </div>
  )
}

export default CreateWorker