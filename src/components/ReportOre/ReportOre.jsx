import React, {useState, useEffect} from 'react'

import { useParams, useSearchParams, Link } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';
import { selectProjectsByUser } from '../../utils/select_projects_by_user';

import months from '../../utils/months';

import eye from '../../assets/eye.svg';

import { saveAs } from 'file-saver';

import Report from './Report';

import './ReportOre.css';

const ReportOre = () => {

  const { worker } = useParams();
  const [searchParams, _] = useSearchParams();
  const [payrolls, setPayrolls] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadBustaPaga = (path) => {
    supabase.storage
    .from('main')
    .download(path)
    .then(({data, error}) => {
        if (!error){
            saveAs(data, 'busta-paga.pdf');
        }
    })
  }

  useEffect(() => {
    const currentYear = (new Date()).getFullYear();
    (async () => {
    let {data, error} = await supabase.from('payrolls').select().eq('user_id', worker);
    if (!error){
        const updatedData = await Promise.all(
            data.map(async (payroll) => {
                const {data,error} = await supabase.from('hours').select().eq('user_id', worker).eq('year', currentYear).eq('month', payroll.month);
                if (!error){
                    const sum = data.map((item) => item.num).reduce((a,b) => a + b, 0);
                    return {
                        ...payroll,
                        totalHours: sum
                    }
                }
            })
        )
        setPayrolls(updatedData);
    }
    })()
    selectProjectsByUser({id: worker}, async function(projects){
        const projectsMapped = projects.map(async (project) => {
            const {data,error} = await supabase.from('hours').select().eq('user_id', worker).eq('year', currentYear).eq('project_id', project.id);
            if (!error){
                const sum = data.map((item) => item.num).reduce((a,b) => a + b, 0);
                return {
                    ...project,
                    totalHours: sum
                }
            }
        })
        const updatedData = await Promise.all(projectsMapped);
        setProjects(updatedData);
        setLoading(false);
    })
  }, [])

  if (loading){
    return (
    <div className="loading">
        <h1>CARICAMENTO...</h1>
    </div>
    )
  }
  
  return (
    <div className='app__report-ore'>
        <div>
            <h2 style={{textTransform: 'uppercase'}}>BUSTE PAGA - {searchParams.get('first_name')} {searchParams.get('last_name')}</h2>
        </div>
        <div className='app__projects'>
            {payrolls.map((payroll) => {
                return (
                    <div className='app__projects-item align-items-center'>
                        <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>{payroll.totalHours}h</span> - {months[payroll.month]}</h3>
                        <div className='align-items-center item-settings'>
                            <button onClick={() => {downloadBustaPaga(payroll.path)}}>
                            <img src={eye} alt="settings" />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        <div style={{marginTop: '3rem'}}>
            <h2 style={{textTransform: 'uppercase'}}>ORE PROGETTO - {searchParams.get('first_name')} {searchParams.get('last_name')}</h2>
        </div>
        <div className='app__projects'>
            {projects.map((project) => {
                return (
                    <div className='app__projects-item align-items-center'>
                        <h3 style={{ fontWeight: 300}}><span style={{color: 'var(--orange-color)'}}>{project.totalHours}h</span> - {project.name}</h3>
                        <div className='align-items-center item-settings'>
                            <Link to={`/documenti/${project.id}`}>
                                <button>
                                    <img src={eye} alt="settings" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}            
        </div>
        <Report/>
    </div>
  )
}

export default ReportOre