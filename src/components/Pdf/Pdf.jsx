import React, {useState, useEffect, useRef} from 'react'

import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import SignatureCanvas from "react-signature-canvas";

import domToPdf from 'dom-to-pdf';

import './pdf.css'

import logo from '../../assets/logo-app-gm.png';

const Pdf = () => {

  const { id } = useParams();  

  const [project, setProject] = useState(null);
  const [hours, setHours] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const navigate = useNavigate();
  const signaturePad = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectPathExtension = (new Date()).getTime();

  const downloadPdf = (upload) => {
    const element = document.getElementById('pdf-mockup');
    const options = {
        filename: `Rapporto ${searchParams.get('giornaliero') ? 'Giornaliero' : 'Complessivo'}-${project.name}-${projectPathExtension}`,
        excludeClassNames: ['signature-pad', 'delete-hour'],
        overrideWidth: 650
    };
    domToPdf(element, options, (pdf) => {
        if (upload){
            const blobPDF =  new Blob([ pdf.output('blob') ], { type : 'application/pdf'});
            upload(blobPDF);
        }
    });
  }

  const upload = async (pdf) => {
    const { data, error } = await supabase.storage
    .from('main')
    .upload(`rapporti/Rapporto${searchParams.get('giornaliero') ? 'Giornaliero' : 'Complessivo'}-${project.name}-${projectPathExtension}`, pdf)
    const path = !error ? data.path : null;
    if (path){
        const { data, error } = await supabase
        .from('rapporti')
        .insert({giornaliero: searchParams.get('giornaliero') ? true : false, path, project_id: id})
        if (!error){
            navigate('/') // !!! Poi bisogna navigare alla pagina con la lista dei rapporti !!!
        } else {
            alert('Some errors occured');
        }
    }
  }

  const deleteHour = (hour) => {
    setHours((prev) => prev.filter((item) => item.id != hour.id));
    supabase
    .from('hours')
    .delete()
    .eq('id', hour.id)
    .then(({error}) => {
        if (error){
            alert('Ci sono stati degli errori');
        }
    })
  }

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
            if (searchParams.get('giornaliero')){
                setHours(JSON.parse(document.getElementById('rapporto-giornaliero-value').value));
                setLoading(false);
            } else {
                    supabase
                .from('hours')
                .select()
                .eq('project_id', id)
                .then(({data, error}) => {
                    if (!error){
                        let hours = data;
                        const user_ids = data.map((item) => item.user_id);
                        supabase.functions.invoke('list-users', {
                            body: {user_ids}
                        }).then(({data}) => {
                            hours = hours.map((item, i) => {
                                return ({
                                    ...item,
                                    email: data[i].user.email,
                                    firstName: data[i].user.user_metadata.first_name,
                                    lastName: data[i].user.user_metadata.last_name
                                })
                            })
                            setHours(hours);
                            setLoading(false);
                        })
                    }
                })
            }
        }
    })
  }, []);

  const saveSignature = async () => {
    const URL = signaturePad.current.getTrimmedCanvas().toDataURL("image/png");
    const blob = await (await fetch(URL)).blob();
    const {data, error} = await supabase.storage
    .from('main')
    .upload(`/signatures/${(new Date()).getTime()}`, blob)
    const path = data.path;
    if (!error){
       const { data } = await supabase.storage
       .from('main')
       .getPublicUrl(path)
       setSignatureUrl(data.publicUrl);
    }
  }

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
            <div className='align-items-center' style={{width: '100%', justifyContent: 'center'}}>
                <section className='pdf' id='pdf-mockup'>
                    <div className='pdf-topbar align-items-center' style={{justifyContent: 'space-between'}}>
                        <div>
                            <h2 style={{textTransform: 'uppercase', marginBottom: '0'}}>{project.name}</h2>
                            <p style={{marginTop: '0.3em'}}>{project.description}</p>
                        </div>
                        <img src={logo} alt={logo} width={50} height={50}/>
                    </div>
                    <div>
                        <h2 style={{display: 'inline', marginRight: '0.3em'}}>DATA:</h2>
                        <span>{(new Date()).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div>
                        <h2 style={{marginBottom: '0px'}}>RISORSE UMANE</h2>
                        {hours.map((item) => {
                            return (
                                <>
                                {!searchParams.get('giornaliero')  ? <p style={{marginTop: '0.3em', marginBottom: '0.3em', fontSize: '0.8em'}}>{item.firstName} {item.lastName} -- {item.num} ore -- {(new Date(item.date)).toLocaleDateString('it-IT')}  <span className='delete-hour' onClick={() => {deleteHour(item)}}>x</span> </p> : <p style={{marginTop: '0.3em', marginBottom: '0.3em', fontSize: '0.8em'}}>{item.user_metadata.first_name} {item.user_metadata.last_name} -- {item.hours} ore </p>}</>
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
                    {signatureUrl 
                    ? 
                    <img src={signatureUrl} className='signature' alt='signature'/> 
                    :
                    <div className='signature-pad'>
                        <SignatureCanvas
                        penColor="black"
                        canvasProps={{ width: 375, height: 175 }}
                        ref={signaturePad}
                        />
                        <div className='align-items-center signature-pad-buttons'>
                            <button className='new-project' onClick={() => {signaturePad.current.clear()}}>
                                <span>PULISCI</span>
                            </button>
                            <button className='new-project' onClick={saveSignature}>
                                <span>SALVA FIRMA</span>
                            </button>
                        </div>
                    </div>
                    }
                </section>
                </div>
            <section>
                <button className='new-project' onClick={() => {downloadPdf(upload)}}>
                    <h2>ARCHIVIA</h2>
                </button>
                <button className='new-project' onClick={() => {downloadPdf(() => false)}}>
                    <h2>SALVA SU DISPOSITIVO</h2>
                </button>
            </section>
        </div>
    </div>
  )
}

export default Pdf