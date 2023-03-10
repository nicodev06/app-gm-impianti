import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

import eye from '../../assets/eye.svg';
import textAlign from '../../assets/text-align.svg';
import settings from '../../assets/settings.svg';

import { supabase } from '../../utils/supabase-client';

const Projects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
  supabase
    .from('projects')
    .select('id, name')
    .then(({ data }) => {
      setProjects(data);
    })
  }, [])


  if (projects.length === 0){
    return (
      <div className='loading'>
        <h1>CARICAMENTO...</h1>
      </div>
    )
  }

  return (
    <div className='app__projects'>
        {projects.map((project) => {
          return (
            <div className='app__projects-item align-items-center'>
                <h3 style={{ fontWeight: 300}}>{project.name}</h3>
                <div className='align-items-center item-settings'>
                    <Link to={`/progetto/${project.id}`}>
                      <button>
                        <img src={eye} alt="eye" />
                      </button>
                    </Link>
                    <button>
                      <img src={textAlign} alt="text-align" />
                    </button>
                    <button>
                      <img src={settings} alt="settings" />
                    </button>
                </div>
            </div>
          )
        })}
    </div>
  )
}

export default Projects