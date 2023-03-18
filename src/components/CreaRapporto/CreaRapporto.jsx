import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';
import { selectProjectsByUser } from '../../utils/select_projects_by_user';


import './CreaRapporto.css'

const CreaRapporto = () => {

    const [_, setCurrentUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        supabase.auth.getUser()
        .then(({data: {user}}) => {
            setCurrentUser(user);
            selectProjectsByUser(user, setProjects);
        })
        }, []) 
    
  return (
    <div className='app__crea-rapporto'>
        <div className='select-project'>
            <h2>CREA RAPPORTO</h2>
            <select
            onChange={(e) => {
                setCurrentProject(e.target.value);
            }}
            >
                <option  disabled selected>Seleziona progetto...</option>
                {projects.map((project) => <option value={project.id}>{project.name}</option>)}
            </select>
        </div>
        <div style={{marginTop: '4rem'}}>
            <Link to={`/progetto/${currentProject}`}>
                <button className="new-project">
                    <h2>CREA RAPPORTO COMPLESSIVO</h2>
                </button>
            </Link>
            <Link to='/crea-rapporto-giornaliero'>
                <button className="new-project">
                    <h2>CREA RAPPORTO GIORNALIERO</h2>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default CreaRapporto