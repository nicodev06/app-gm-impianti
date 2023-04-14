import React, {useState, useEffect} from 'react'

import './NewProject.css';

import { useNavigate } from 'react-router-dom';

// custom components
import Checkbox from '../Checkbox';

import { supabase } from '../../utils/supabase-client';

const NewProject = () => {

  const [workers, setWorkers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const checkboxHandler = (flag, val) => {
    if (flag){
        setSelected([...selected, val])
    } else {
        setSelected(selected.filter((item) => item.id !== val.id))
    }
  }

  const createProject = () => {
    if (name.length > 0){
        supabase
        .from('projects')
        .insert({name, description})
        .select()
        .then(({data, error}) => {
            console.log(data);
            if (!error){
                const entries = selected.map((item) => {
                    return {
                        user_id: item.id,
                        project_id: data[0]?.id
                    }
                });
                supabase
                .from('holdings')
                .insert(entries)
                .then(() => {
                    navigate('/');
                })
            }
        })
    }
  }

  useEffect(() => {
    supabase.functions.invoke('list-users', {
        body: {}
      }).then(({ data }) => {
        setWorkers(data?.users);
      })
  }, [])

    
  return (
    <div className='app__new-project'>
        <div className='app__new-project-bar'>
            <h2 style={{color: '#fff'}}>NUOVO PROGETTO</h2>
        </div>
        <div className='app__new-project-inputs'>
            <input type="text" placeholder='titolo del progetto' onChange={(e) => {setName(e.target.value)}}/>
            <textarea placeholder='descrizione...'  style={{height: '20vh'}} onChange={(e) => {setDescription(e.target.value)}}/>
        </div>
        <div>
            <h2 style={{color: '#fff', marginBottom: 0, marginTop: '1.5rem'}}>ASSEGNA IL LAVORO A:</h2>
            {workers.map((worker) => {
                return (
                    <div className='new-project-checkbox' style={{marginTop: '1rem'}}>
                        <Checkbox handler={checkboxHandler} val={worker}/>
                        <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>{worker.user_metadata.first_name} {worker.user_metadata.last_name}</h3>
                    </div>
                )
            })}
        </div>
        <div>
            <button className='new-project' onClick={() => {createProject()}}>
                <h2>CREA PROGETTO</h2>
            </button>
        </div>
    </div>
  )
}

export default NewProject