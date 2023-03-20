import React, {useState, useEffect, useRef} from 'react'

import { useParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import './pdf.css'

const Pdf = () => {

  const { id } = useParams();  

  const [project, setProject] = useState(null);
  const [hours, setHours] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const signaturePad = useRef(null);

  useEffect(() => {
    supabase
    .from('projects')
    .select()
    .eq('id', id)
    .then(({data, error}) => {
        if (!error){
            setProject(data[0]);
            (async () => {
                setImages((await Promise.all(data[0].images.map(async (item) => {
                    return supabase.storage.from('main').getPublicUrl(item);
                }))).map((item) => {
                    if (!item.error){
                        return item.data.publicUrl
                    }
                }));
            })();
            supabase
            .from('hours')
            .select()
            .eq('project_id', id)
            .then(({data, error}) => {
                if (!error){
                    let hours = data;
                    const users_ids = data.map((item) => item.user_id);
                    supabase.functions.invoke('list-users', {
                        body: {users_ids}
                    }).then(({data}) => {
                        hours = hours.map((item, i) => {
                            return ({
                                ...item,
                                email: data.users[i].email
                            })
                        })
                        setHours(hours);
                        setLoading(false);
                    })
                }
            })
        }
    })
  }, []);

  if (loading){
    return (
        <div className='loading'>
            <h1>CARICAMENTO...</h1>
        </div>
    )
  }
    
  return (
    <div style={{margin: '1rem'}}>
        <div>
            <section className='pdf'>
                <div className='pdf-topbar align-items-center'>
                    <div>
                        <h2 style={{textTransform: 'uppercase', marginBottom: '0'}}>{project.name}</h2>
                        <p style={{marginTop: '0.3em'}}>{project.description}</p>
                    </div>
                </div>
                <div>
                    <h2 style={{display: 'inline', marginRight: '0.3em'}}>DATA:</h2>
                    <span>{(new Date()).toLocaleDateString('it-IT')}</span>
                </div>
                <div>
                    <h2 style={{marginBottom: '0px'}}>RISORSE UMANE</h2>
                    {hours.map((item) => {
                        return (
                            <p style={{marginTop: '0.3em', marginBottom: '0.3em'}}>{item.email} ore: {item.num}</p>
                        )
                    })}
                </div>
                <div>
                    <h2>NOTE:</h2>
                    <p>{project.notes}</p>
                </div>
                <div style={{marginTop: '2em'}}>
                    <div className='grid-images'>
                        {images.map((item) => {
                            return (
                                <img src={item} alt='image'/>
                            )
                        })}
                    </div>
                </div>
                <div style={{marginTop: '2em'}}>
                    <canvas ref={signaturePad}></canvas>
                </div>
            </section>
            <section>
                <button className='new-project'>
                    <h2>ARCHIVIA</h2>
                </button>
                <button className='new-project'>
                    <h2>SALVA SU DISPOSITIVO</h2>
                </button>
            </section>
        </div>
    </div>
  )
}

export default Pdf