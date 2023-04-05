import React, {useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom';

import eye from '../../assets/eye.svg';
import textAlign from '../../assets/text-align.svg';
import settings from '../../assets/settings.svg';

import { supabase } from '../../utils/supabase-client';
import { selectProjectsByUser } from '../../utils/select_projects_by_user';

import Popup from '../Popup';
import { Context } from './HomepageContext';

const UpdateProject = ({ project, setProjects, handleClose }) => {

  const [name, setName] = useState(project.name);
  const [loading, setLoading] = useState(false);

  const updateName = () => {
    setLoading(true);
    supabase
    .from('projects')
    .update({name})
    .eq('id', project.id)
    .then(({error}) => {
      if (!error){
        supabase
        .from('projects')
        .select()
        .is('status', null)
        .then(({data, error}) => {
          if (!error){
            handleClose();
          }
        })
      }
    })
  }

  const archive = () => {
    setLoading(true);
    if (project.status){
      supabase
      .from('projects')
      .delete()
      .eq('id', project.id)
      .then(({ error }) => {
        if (!error){
          handleClose();
        }
      })
    } else {
      supabase
      .from('projects')
      .update({status: true})
      .eq('id', project.id)
      .then(({error}) => {
        if (!error){
          supabase
          .from('projects')
          .select()
          .is('status', null)
          .then(({data, error}) => {
            if (!error){
              handleClose();
            }
          })
        }
      })
      }
  }

  return (
    <div className='create-worker'>
        <div className='align-items-center' style={{borderBottom: '1px solid var(--gray-color)'}}>
            <h2>MODIFICA {project.name}</h2>
        </div>
        <div>
            <p>Nome progetto</p>
            <input type="text" placeholder='Nome progetto' className='login-input' value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div className='align-items-center' style={{marginTop: '2rem'}}>
            <button className='green-button' onClick={updateName}>
                <h3>{loading ? 'CARICAMENTO...' : 'AGGIORNA'}</h3>
            </button>
            <button className='red-button' style={{marginLeft: '1rem'}} onClick={archive}>
                <h3>{loading ? 'CARICAMENTO...' : (project.status ? 'ELIMINA' : 'ARCHIVIA')}</h3>
            </button>
        </div>
    </div>
  )
}


const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const { archived } = useContext(Context);

  useEffect(() => {
  supabase.auth.getUser()
  .then(({data: {user}}) => {
    if (user?.user_metadata?.is_admin){
      supabase
      .from('projects')
      .select()
      .is('status', archived)
      .then(({ data }) => {
        setProjects(data);
      })
    } else {
      selectProjectsByUser(user, setProjects, archived) //archiviati o no
    }
  })
  }, [showPopup, archived])


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
                    <Link to={`/documenti/${project.id}`}>
                      <button>
                        <img src={textAlign} alt="text-align" />
                      </button>
                    </Link>
                    <button onClick={() => {
                      setShowPopup(true);
                      setCurrentProject(project);
                    }}>
                      <img src={settings} alt="settings" />
                    </button>
                </div>
            </div>
          )
        })}
        {showPopup && 
        <Popup handleClose={() => {setShowPopup(false)}}>
          <UpdateProject project={currentProject} handleClose={() => {setShowPopup(false)}} setProjects={setProjects}/>
        </Popup>
          }
    </div>
  )
}

export default Projects