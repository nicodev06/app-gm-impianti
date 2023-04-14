import React, {useEffect, useState} from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import './ProjectPage.css';

const ProjectPage = () => {

  const [project, setProject] = useState("");
  const [workers, setWorkers] = useState([]);
  const [previousImages, setPreviousImages] = useState([]);
  const [previousUrl, setPreviousUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  const uploadImages = async () => {
    const data = await Promise.all(images.map((image) => {
        const path = `images/${id}+${image.name}`;
        return supabase.storage.from('main').upload(path, image);
    }))
    return data.map((item) => {
        if (!item.error){
            return item.data.path
        }
    });
    
  }

  const creaRapporto = async () => {
    setLoading(true);
    const paths = await uploadImages();
    await supabase.from('projects').update({images: [...previousImages, ...paths]}).eq('id', id);
    await supabase.from('projects').update({notes}).eq('id', id);
    setLoading(false);
    navigate(`/progetto/${id}/pdf`);
  }

  useEffect(() => {
    supabase
    .from('projects')
    .select('name, description, notes, images')
    .eq('id', id)
    .then(({ data, error }) => {
        if (!error){
            setProject(data[0]);
            setNotes(data[0].notes);
            setPreviousImages(data[0].images);
            (async () => {
                setPreviousUrl((await Promise.all(data[0].images.map(async (item) => {
                    return supabase.storage.from('main').getPublicUrl(item);
                }))).map((item) => {
                    if (!item.error){
                        return item.data.publicUrl
                    }
                }));
            })();
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

  if (loading) {
    return (
        <div className='loading'>
            <h1>CARICAMENTO...</h1>
        </div>
    )
  }
    
  return (
    <div className='app__project-page'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>{project.name}</h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>{project.description}</h4>
            <h2>LAVORATORI: </h2>
            <h4 style={{fontWeight: 400, marginTop: '0px'}}>{workers.map((item) => <span>{item.user.user_metadata.first_name} {item.user.user_metadata.last_name}, </span>)}</h4>
        </div>
        <div className='app__new-project-inputs'>
            <textarea placeholder='Inserisci note testuali'  style={{height: '20vh'}} value={notes} onChange={(e) => {setNotes(e.target.value)}}/>
        </div>
        <div>
            <h2>FOTO ALLEGATA</h2>
            <div className='images-gallery'>
                <div className='attached-picture'>
                    <label htmlFor='picture-input'>+</label>
                    <input 
                    type='file' 
                    accept="image/*"
                    style={{display: 'none'}} 
                    id='picture-input'
                    onChange={(e) => {setImages((prev) => [...prev, ...e.target.files])}}
                    />
                </div>
                {previousUrl.map(((image) => {
                    return (
                        <div>
                            <img
                            style={{
                                width: '20vw',
                                height: 'auto',
                                marginLeft: '0.5em'
                            }} 
                            src={image} 
                            alt="image" />
                        </div>
                    )
                }))}
                {images.map((image) => {
                    return (
                        <div>
                            <img 
                            style={{
                                width: '20vw',
                                height: 'auto',
                                marginLeft: '0.5em'
                            }}
                            src={URL.createObjectURL(image)} alt="image"/>
                        </div>
                    )
                })}
            </div>
        </div>
        <div style={{marginTop: '1rem'}}>
            <Link to={'/aggiorna-ore'}>
                <button className='new-project'>
                    <h3>INSERISCI ORE</h3>
                </button>
            </Link>
            <button className='new-project' onClick={creaRapporto}>
                <h3>CREA RAPPORTO COMPLESSIVO</h3>
            </button>
            <Link to={`/crea-rapporto-giornaliero/${id}`}>
                <button className='new-project'>
                    <h3>CREA RAPPORTO GIORNALIERO</h3>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default ProjectPage