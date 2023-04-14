import React, {useState, useEffect} from 'react'

import './CreaRapportoGiornaliero.css';

import {useParams, Link} from 'react-router-dom';

import Checkbox from '../Checkbox';

import { supabase } from '../../utils/supabase-client';

const CreaRapportoGiornaliero = () => {

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  useEffect(() => {
    supabase
    .from('holdings')
    .select('user_id')
    .eq('project_id', id)
    .then(({data, error}) => {
        if (!error){
            const user_ids = data.map((item) => item.user_id);
            supabase.functions.invoke('list-users', {
                body: {user_ids}
            }).then(({data}) => {
                setUsers(data.map((item) => {
                    return {
                        ...item.user,
                        hours: 0
                    }
                }))
            })
        }
    })
  }, [])

  const checkboxHandler = (flag, val) => {
    if (flag){
        setSelectedUsers((prev) => [...prev, val])
    } else {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== val.id))
    }
  }

  const creaRapportoGiornaliero = () => {
    const items = selectedUsers.map((user) => {
        const user_item = users.find((item) => item.id == user.id);
        if (user_item){
            return {
                ...user,
                hours: parseInt(user_item.hours)
            }
        } else {
            return {
                ...user,
                hours: 0
            }
        }
    });
    console.log(items);
    document.getElementById('rapporto-giornaliero-value').value = JSON.stringify(items);
  }
  
  return (
    <div className='app__rapporto-giornaliero'>
        <div>
            <h2>CREA RAPPORTO GIORNALIERO</h2>
            <h4 style={{marginTop: '0.5rem'}}>Seleziona i lavoratori ed attribuisci il numero di ore</h4>
        </div>
        <div className='app__raporto-giornaliero-workers'>
            {users.map((user) => {
                return (
                    <div className='new-project-checkbox'>
                        <div className='align-items-center' style={{width: '75%'}}>
                            <Checkbox handler={checkboxHandler} val={user}/>
                            <div style={{display: 'block',width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                                <h3 style={{fontWeight: 400, marginLeft: '0.5rem'}}>{user.user_metadata.first_name} {user.user_metadata.last_name}</h3>
                            </div>
                        </div>
                        <input 
                        type="number"
                        style={{width: '5vw'}}
                        value={user.hours}
                        onChange={(e) => {
                            setUsers(
                            users.map((item) => {
                                if (item.id == user.id){
                                    return {
                                        ...item,
                                        hours: e.target.value
                                    }
                                } else {
                                    return item
                                }
                            }))
                        }} 
                        />
                    </div>
                )
            })}    
        </div>
        <div style={{marginTop: '1rem'}}>
            <Link to={`/progetto/${id}/pdf?giornaliero=1`} onClick={creaRapportoGiornaliero}>
                <button className="new-project">
                    <h2>CREA RAPPORTO GIORNALIERO</h2>
                </button>
            </Link>
            <p>Le note e le foto generate nel pdf vengono prese dal progetto</p>
        </div>
    </div>
  )
}

export default CreaRapportoGiornaliero