import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';
import { selectProjectsByUser } from '../../utils/select_projects_by_user';

import './UpdateHours.css';

const UpdateHours = () => {

  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [date, setDate] = useState(null);
  const [num, setNum] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate(); 

  const add = async () => {
    if (projectId && date && (num > 0)){
      const formattedDate = new Date(date);
      const ISOFormattedDate = formattedDate.toISOString();
      const month = formattedDate.getMonth();
      const year = formattedDate.getFullYear();
      const {data, error} = await supabase
      .from('hours')
      .select()
      .eq('date', date)
      if (data.length > 0){
        supabase
        .from('hours')
        .update({num: parseInt(data[0].num) + parseInt(num)})
        .eq('date', date)
        .then(({error}) => {
          if (!error){
            alert("Ore aggiunte correttamente!")
            navigate('/');
          }
        })
      } else {
        supabase
        .from('hours')
        .insert([{
          user_id: currentUser.id,
          project_id: projectId,
          date: ISOFormattedDate,
          month,
          num,
          year
        }])
        .then(({error}) => {
          if (!error){
            alert("Ore aggiunte correttamente!")
            navigate('/');
          }
        })
        }
    }
  }

  useEffect(() => {
    supabase.auth.getUser()
    .then(({data: {user}}) => {
      setCurrentUser(user);
      selectProjectsByUser(user, setProjects);
    })
  }, [])

  return (
    <div className='app__update-hours'>
      <div>
        <h2>AGGIUNGI ORE</h2>
      </div>
      <div>
        <select 
        style={{width: '100%'}}
        onChange={(e) => {setProjectId(e.target.value)}}
        >
        <option  disabled selected value={null}>Seleziona progetto...</option>
        {projects.map((item) => {
          return (
            <option value={item.id}>{item.name}</option>
          )
        })}
        </select>
      </div>
      <div style={{marginTop: '1rem'}}>
        <div className='align-items-center' style={{width: '100%', justifyContent: 'space-between'}}>
          <h3 style={{fontWeight: 500}}>Seleziona il giorno</h3>
          <input type="date" onChange={(e) => {setDate(e.target.value)}} />
        </div>
        <div className='align-items-center' style={{width: '100%', justifyContent: 'space-between'}}>
          <h3 style={{fontWeight: 500}}>Numero di ore lavorate</h3>
          <input 
          type="number" 
          style={{width: '6.2rem'}}
          value={num}
          onChange={(e) => {setNum(e.target.value)}}
          />
        </div>
      </div>
      <div style={{marginTop: '1rem'}}>
        <button className='align-items-center' style={{color: '#fff'}} onClick={add}>
            <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
            <h3 style={{fontWeight: 600}}>AGGIUNGI ORE</h3>
        </button>
        <h4 style={{fontWeight: 300, marginTop: '0.5rem'}}>Le ore aggiunte saranno visibili all'interno del progetto e si andranno a sommare alle tue ore mensili</h4>
      </div>
    </div>
  )
}

export default UpdateHours