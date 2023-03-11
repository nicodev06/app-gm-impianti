import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import './ProjectPage.css';

const ProjectPage = () => {

  const [project, setProject] = useState("");
  const [workers, setWorkers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    supabase
    .from('projects')
    .select('name, description')
    .eq('id', id)
    .then(({ data, error }) => {
        if (!error){
            setProject(data[0]);
            supabase
            .from('holdings')
            .select('user_id')
            .eq('project_id', id)
            .then((({data, error}) => {
                let user_ids = [];
                data.forEach((item) => {
                    user_ids.push(item.user_id);
                })
                supabase.functions.invoke('list-users', {
                    body: {user_ids},
                }).then(({data}) => {
                    setWorkers(data);
                })
            }))
        }
    })
  }, [])
    
  return (
    <div className='app__project-page'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>{project.name}</h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>{project.description}</h4>
            <h2>LAVORATORI: </h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>{workers.map((item) => <span>{item.user.email}, </span>)}</h4>
        </div>
        <div className='app__new-project-inputs'>
            <textarea placeholder='Inserisci note testuali'  style={{height: '20vh'}} />
        </div>
        <div>
            <h2>FOTO ALLEGATA</h2>
            <div className='attached-picture'>
                <span>+</span>
            </div>
        </div>
        <div style={{marginTop: '1rem'}}>
            <button className='new-project'>
                <h3>INSERISCI ORE</h3>
            </button>
            <button className='new-project'>
                <h3>CREA RAPPORTO COMPLESSIVO</h3>
            </button>
            <button className='new-project'>
                <h3>CREA RAPPORTO GIORNALIERO</h3>
            </button>
        </div>
    </div>
  )
}

export default ProjectPage