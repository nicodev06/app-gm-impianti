import React, {useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom';

import eye from '../../assets/eye.svg';
import textAlign from '../../assets/text-align.svg';
import settings from '../../assets/settings.svg';

import { supabase } from '../../utils/supabase-client';
import { selectProjectsByUser } from '../../utils/select_projects_by_user';

import Popup from '../Popup';
import { Context } from './HomepageContext';

import Checkbox from '../Checkbox';

const UpdateProject = ({ project, setProjects, handleClose }) => {

  const [name, setName] = useState(project.name);
  const [loading, setLoading] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [workers, setWorkers] = useState([]);

  const updateUsers = async () => {
    const toAdd = [];
    const toRemove = [];
    workers.forEach((item) => {
        if (item.in_project){
          if (!holdings.includes(item.id)){
            toAdd.push({user_id: item.id, project_id: project.id})
          }
        } else {
          if (holdings.includes(item.id)){
            toRemove.push(item.id)
          }
        }
    })
    await supabase
    .from('holdings')
    .insert(toAdd)
    await supabase
    .from('holdings')
    .delete()
    .in('user_id', toRemove)
  }

  const updateName = () => {
    setLoading(true);
    updateUsers();
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

  useEffect(() => {
    supabase
    .from('holdings')
    .select('user_id')
    .eq('project_id', project.id)
    .then(({ data, error }) => {
      if (!error){
        const holdings = data.map((item) => item.user_id);
        setHoldings(holdings)
        supabase.functions.invoke('list-users', {
          body: {}
        }).then(({ data }) => {
          setWorkers(data?.users.map((item) => {
            return {
              ...item,
              in_project: holdings.includes(item.id)
            }
          }));
        })
      }
    })
  }, [])



  const checkboxHandler = (isActive, val) => {
    setWorkers((prev) => prev.map((item) => {
      if (item.id == val){
        return {
          ...item,
          in_project: isActive
        }
      } else {
        return item
      }
    }))
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
        <div>
            <h2 style={{color: '#fff', marginBottom: 0, marginTop: '1.5rem'}}>LAVORATORI</h2>
            {workers.map((worker) => {
                return (
                    <div className='new-project-checkbox' style={{marginTop: '1rem'}}>
                        <Checkbox activeDefault={worker.in_project} val={worker.id} handler={checkboxHandler}/>
                        <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>{worker.user_metadata.first_name} {worker.user_metadata.last_name}</h3>
                    </div>
                )
            })}
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
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
  supabase.auth.getUser()
  .then(({data: {user}}) => {
    setCurrentUser(user);
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
                    {currentUser?.user_metadata?.is_admin && <button onClick={() => {
                      setShowPopup(true);
                      setCurrentProject(project);
                    }}>
                      <img src={settings} alt="settings" />
                    </button>}
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