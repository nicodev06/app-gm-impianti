import React, { useState, useEffect, useRef } from 'react'

import { useParams, useSearchParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import { saveAs } from 'file-saver';

import eye from '../../assets/eye.svg';

import './Bustepaga.css';

const Bustepaga = () => {

  const { worker } = useParams();
  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  const [usedMonths, setUsedMonths] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const defaultOption = useRef();
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const downloadBustaPaga = (path) => {
    supabase.storage
    .from('main')
    .download(path)
    .then(({data, error}) => {
        if (!error){
            saveAs(data, 'busta-paga.pdf');
        }
    })
  }

  const uploadBustaPaga = (e) => {
    if (currentMonth){
        setLoading(true);
        const file = e.target.files[0];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentUserId = currentUser.id;
        const path = `buste-paga/${currentUserId}+${currentMonth}+${currentYear}.pdf`;
        supabase.storage
        .from('main')
        .upload(path, file)
        .then(({data, error}) => {
            if (!error){
                supabase
                .from('payrolls')
                .insert([
                    {
                        user_id: currentUserId,
                        month: currentMonth,
                        year: currentYear,
                        path
                    }
                ])
                .then(({data, error}) => {
                    if (!error){
                        supabase
                        .from('payrolls')
                        .select('month, path')
                        .eq('user_id', currentUser.id)
                        .eq('year', new Date().getFullYear())
                        .order('month', true)
                        .then(({data, error}) => {
                            if (!error){
                                setPayrolls(data);
                                setUsedMonths(data.map((item) => months[item.month]))
                                setLoading(false);
                                defaultOption.current.selected = 'selected';
                            }
                        })
                    }
                })
            }
        })
        }
  }

  useEffect(() => {
    if (!worker){
        supabase.auth.getUser()
        .then(({data: {user}}) => {
            setCurrentUser(user);
            supabase
            .from('payrolls')
            .select('month, path')
            .eq('user_id', user.id)
            .eq('year', new Date().getFullYear())
            .order('month', true)
            .then(({data, error}) => {
                if (!error){
                    setPayrolls(data);
                    setUsedMonths(data.map((item) => months[item.month]))
                    setLoading(false);
                }
            })
        })
    } else {
        const user_ids = [worker,]
        supabase.functions.invoke('list-users', {
            body: {user_ids},
        }).then(({data}) => {
            setCurrentUser(data[0]?.user);
            supabase
            .from('payrolls')
            .select('month, path')
            .eq('user_id', data[0]?.user.id)
            .eq('year', new Date().getFullYear())
            .order('month', true)
            .then(({data, error}) => {
                if (!error){
                    setPayrolls(data);
                    setUsedMonths(data.map((item) => months[item.month]))
                    setLoading(false);
                }
            })
        })
    }
    supabase.auth.getUser()
    .then(({data: {user}}) => {
        setUserLoggedIn(user);
    })
  }, [])
  
  return (
    <div className='app__buste-paga'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>{searchParams.get('first_name') ? "BUSTE PAGA - " + searchParams.get('first_name') +  " " + searchParams.get('last_name') : "LE MIE BUSTE PAGA"}</h2>
        </div>
        <div className='app__projects'>
            {loading 
            ? 
            <div className='loading'>
                <h1>CARICAMENTO...</h1>
            </div>
            :
            (
                payrolls.map(({month, path}) => 
                    <div className='app__projects-item align-items-center'>
                    <h3 style={{ fontWeight: 300}}>{months[month]}</h3>
                    <div className='align-items-center item-settings'>
                        <button onClick={() => {downloadBustaPaga(path)}}>
                            <img src={eye} alt="clock" />
                        </button>
                    </div>
                </div>
                )
            )
        }
        </div>
        {userLoggedIn?.user_metadata?.is_admin && (
        <>
            <div className='app__buste-paga-add align-items-center'>
                <div className='attached-picture'>
                    <label htmlFor='busta-paga-input'>+</label>
                    <input 
                    type='file' 
                    accept='.pdf' 
                    style={{display: 'none'}} 
                    id='busta-paga-input'
                    onChange={(e) => {uploadBustaPaga(e)}}
                    />
                </div>
                <div className='app__buste-paga-choice-month'>
                    <select 
                    name="selezione mese..."
                    onChange={(e) => {setCurrentMonth(e.target.value)}}
                    >
                        <option value="" selected ref={defaultOption}>Scegli</option>
                        {months.filter((item) => !usedMonths.includes(item)).map((month) => 
                        <option 
                        value={months.indexOf(month)}
                        >
                            {month}
                        </option>)}
                    </select>
                    <h4 style={{fontWeight: 300, marginTop: '0.5rem', padding: 0}}>carica il file in pdf</h4>
                </div>
            </div>
            <div>
                <button className='align-items-center' style={{color: 'white', marginTop: '1rem'}}>
                    <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
                    <label htmlFor='busta-paga-input-button'>
                        <h3>AGGIUNGI BUSTA PAGA</h3>
                    </label>
                    <input 
                    type='file' 
                    accept='.pdf' 
                    style={{display: 'none'}} 
                    id='busta-paga-input-button'
                    onChange={(e) => {uploadBustaPaga(e)}}
                    />
                </button>
            </div>
        </>
        )}
    </div>
  )
}

export default Bustepaga