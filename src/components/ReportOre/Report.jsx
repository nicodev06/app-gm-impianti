import React, {useState, useEffect} from 'react'

import { useSearchParams, useParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

const Report = () => {

  const [searchParams, _] = useSearchParams();
  const { worker } = useParams();
  const [report, setReport] = useState([]);


  
  useEffect(() => {
    supabase
    .from('hours')
    .select()
    .eq('user_id', worker)
    .then(async ({data, error}) => {
        if (!error){
            const hours = [];
            for (let item of data) {
                const alreadyIn = hours.find((hour) => {
                  return hour.date == item.date
                });
                const {data, error} = await supabase
                .from('projects')
                .select()
                .eq('id', item.project_id)
                if (!error){
                  if (alreadyIn){
                    alreadyIn.projects.push({project: data[0].name, hours: item.num})
                  } else {
                    hours.push({
                      date: item.date,
                      projects: [
                        {
                          project: data[0].name,
                          hours: item.num
                        }
                      ]
                    })
                  }
                }
            }
          setReport(hours)
        }
    })
  }, [])

  return (
    <>
        <div style={{marginTop: '3rem'}}>
            <h2 style={{textTransform: 'uppercase'}}>REPORT ORE - {searchParams.get('first_name')} {searchParams.get('last_name')}</h2>
        </div>
        <div>
          <table border="1" bordercolor="#939192"> 
            <tr>
              <td>
                <h4  style={{margin: '0.5rem'}}>Giorno</h4>
              </td>
              <td>
                <div className='align-items-center' style={{justifyContent: 'space-between', margin: '0.25rem'}}>
                  <h4>Progetto</h4>
                  <h4>Numero di ore</h4>
                </div>
              </td>
            </tr>
            {report?.map((hour) => 
              <tr>
                <td>
                  <h4 style={{margin: '1rem'}} className='date'>{hour.date}</h4>
                </td>
                <td>
                  <table>
                    {hour?.projects?.map((project) => 
                      <tr>
                        <td><h4 style={{margin: '0.5rem', fontWeight: 300}}>{project.project}</h4></td>
                        <td><h3 style={{margin: '0.5rem', fontWeight: 300, color: 'var(--orange-color)'}}>{project.hours}h</h3></td>
                      </tr>
                    )}
                  </table>
                </td>
              </tr>
            )}
          </table>
        </div>
    </>
  )
}

export default Report