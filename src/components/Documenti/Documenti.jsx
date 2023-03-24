import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client'; 

import { saveAs } from 'file-saver';

import eye from '../../assets/eye.svg';

const Documenti = () => {

  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const download = (path) => {
    supabase.storage
    .from('main')
    .download(path)
    .then(({data, error}) => {
        if (!error){
            saveAs(data, 'rapporto.pdf')
        }
    })
  }

  useEffect(() => {
    supabase
    .from('rapporti')
    .select()
    .eq('project_id', id)
    .then(({data, error}) => {
        if (!error){
            setLoading(false);
            setDocuments(data);
        }
    })
  }, [])

  if (loading){
    return (
        <div className='loading'>
            <h1>CARICAMENTO...</h1>
        </div>
    )
  }

  if (documents.length == 0){
    return (
        <div className='loading'>
            <h1>NON CI SONO RAPPORTI</h1>
        </div>
    )
  }
    
  return (
    <div className='app__projects' style={{marginTop: '1rem', marginLeft: '0.2rem'}}>
        {documents.map((item) => {
            return (
                <div className='app__projects-item align-items-center'>
                    <h3 style={{ fontWeight: 300, color: '#fff'}}>{item.giornaliero ? `Rapporto giornaliero del ${(new Date(item.created_at)).toLocaleDateString('it-IT')}` : 'Rapporto complessivo'}</h3>
                    <div className='item-settings'>
                        <button onClick={() => {download(item.path)}}>
                            <img src={eye} alt="eye" />
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Documenti