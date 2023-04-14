import React, { useState } from 'react';

import { supabase } from '../../utils/supabase-client';

const Update = ({ currentWorker, handleClose, setCurrentStep }) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(currentWorker?.email);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(currentWorker?.user_metadata.first_name);
    const [lastName, setLastName] = useState(currentWorker?.user_metadata.last_name);

    const update = () => {
        if (email.length > 0 || password.length > 0){
            supabase.functions.invoke('update-user', {
                body: {
                    id: currentWorker?.id, 
                    email, 
                    password, 
                    user_metadata: {
                        ...currentWorker?.user_metadata,
                        first_name: firstName,
                        last_name: lastName
                    }
                },
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
                <h2>AGGIORNA LAVORATORE</h2>
            </div>
            <div>
                <p>Email:</p>
                <input type="email" placeholder='email' className='login-input' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <p>Nome:</p>
                <input type="text" placeholder='nome' className='login-input' onChange={(e) => {setFirstName(e.target.value)}} value={firstName}/>
                <p>Cognome:</p>
                <input type="text" placeholder='cognome' className='login-input' onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                <p>Password:</p>
                <input type="password" placeholder='password' className='login-input' onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className='align-items-center' style={{marginTop: '2rem'}}>
                <button className='red-button' style={{marginRight: '1rem'}} onClick={() => {setCurrentStep(2)}}>
                    <h3>ElIMINA</h3>
                </button>
                <button className='green-button' onClick={update}>
                    <h3>{loading ? 'CARICAMENTO...' : 'AGGIORNA'}</h3>
                </button>
            </div>
        </div>
    )
}

const Delete = ({currentWorker, setCurrentStep, handleClose}) => {

    const [loading, setLoading] = useState(false);

    const deleteWorker = () => {
        supabase.functions.invoke('delete-worker', {
            body: {
                id: currentWorker?.id, 
            },
        }).then(() => {
            setLoading(false);
            handleClose();
        })
        setLoading(true);
      }

    return (
        <div className="create-worker">
            <div className='align-items-center' style={{borderBottom: '1px solid var(--gray-color)'}}>
                <h2>ELIMINA LAVORATORE</h2>
            </div>
            <h3>Procedendo tutti i dati verranno persi.</h3>
            <div className='align-items-center' style={{marginTop: '2rem'}}>
                <button className='green-button' style={{marginRight: '1rem'}} onClick={() => {setCurrentStep(1)}}>
                    <h3>INDIETRO</h3>
                </button>
                <button className='red-button' onClick={() => {deleteWorker()}}>
                    <h3>{loading ? 'CARICAMENTO...' : 'ELIMINA'}</h3>
                </button>
            </div>
        </div>
    )
}

const UpdateWorker = ({ currentWorker, handleClose }) => {
  
  const [currentStep, setCurrentStep] = useState(1);
    
  return (
    <>
        {currentStep === 1 && <Update currentWorker={currentWorker} handleClose={handleClose} setCurrentStep={setCurrentStep}/>}
        {currentStep === 2 && <Delete setCurrentStep={setCurrentStep} handleClose={handleClose} currentWorker={currentWorker}/>}
    </>
  )
}

export default UpdateWorker