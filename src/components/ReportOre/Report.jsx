import React, {useState, useEffect} from 'react'

import { useSearchParams, useParams } from 'react-router-dom';

import { supabase } from '../../utils/supabase-client';

import mesi from '../../utils/months.js';

import {
  useJsonToCsv
} from 'react-json-csv';

const Report = () => {

  const [searchParams, _] = useSearchParams();
  const { worker } = useParams();
  const [report, setReport] = useState([]);
  const [months, setMonths] = useState([]);
  const [csvHours, setCsvHours] = useState([]);
  const { saveAsCsv } = useJsonToCsv();  

  
  useEffect(() => {
    supabase
    .from('hours')
    .select()
    .eq('user_id', worker)
    .order('date')
    .then(async ({data, error}) => {
        console.log(data);
        if (!error){
            const hours = [];
            const csvHoursData = [];
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
                  csvHoursData.push({date: (new Date(item.date)).toLocaleDateString('it-IT'), project: data[0].name, hours: item.num})
                }
            }
          setCsvHours(csvHoursData);
          setReport(hours)
          const months = [];
          for (let item of data){
            const alreadyIn = months.find((month) => {
              return (month.month == item.month) && (month.year == item.year)
            });
            if (alreadyIn){
              alreadyIn.num += item.num
            } else {
              months.push({
                month: item.month,
                year: item.year,
                num: item.num
              })
            }
          }
          setMonths(months);
        }
    })
  }, [])


  return (
    <>
        <div style={{marginTop: '3rem', display: 'flex', justifyContent: 'space-between'}}>
            <h2 style={{textTransform: 'uppercase'}}>REPORT ORE - {searchParams.get('first_name')} {searchParams.get('last_name')}</h2>
            <button 
            style={{backgroundColor: 'var(--orange-color)'}}
            onClick={() =>
              saveAsCsv({ 
              data: csvHours, 
              fields: {
                "date": "Data",
                "project": "Progetto",
                "hours": "Numero di ore"
              }, 
              filename: `${searchParams.get('first_name')}-${searchParams.get('last_name')}-report-ore.csv` })
            }
            >
              <h3 style={{color: '#fff'}} >Esporta</h3>
            </button>
        </div>
        <div>
          <table border="1" bordercolor="#939192" id='report-ore'> 
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
                  <h4 style={{margin: '1rem'}} className='date'>{(new Date(hour.date)).toLocaleDateString('it-IT')}</h4>
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
        <div style={{marginTop: '3rem', display: 'flex', justifyContent: 'space-between'}}>
            <h2 style={{textTransform: 'uppercase'}}>REPORT MESE - {searchParams.get('first_name')} {searchParams.get('last_name')}</h2>
            <button 
            style={{backgroundColor: 'var(--orange-color)'}}
            onClick={() =>
              saveAsCsv({ 
              data: months.map((item) => {
                return {
                  month: `${mesi[item.month]} ${item.year}`,
                  num: item.num
                }
              }), 
              fields: {
                "month": "Mese",
                "num": "Numero di ore"
              }, 
              filename: `${searchParams.get('first_name')}-${searchParams.get('last_name')}-report-mensile.csv` })
            }
            >
              <h3 style={{color: '#fff'}} >Esporta</h3>
            </button>
        </div>
        <table border="1" bordercolor="#939192">
            <tr>
              <td>
                <h4  style={{margin: '0.5rem'}}>Mese</h4>
              </td>
              <td>
                <h4  style={{margin: '0.5rem'}}>Totale ore</h4>
              </td>
            </tr>
            {months.map((month) => {
              return (
                <tr>
                  <td><h4 style={{margin: '0.5rem', fontWeight: 300}}>{mesi[month.month]} {month.year}</h4></td>
                  <td><h3 style={{margin: '0.5rem', fontWeight: 300, color: 'var(--orange-color)'}}>{month.num}h</h3></td>
                </tr>
              )
            })} 
        </table>
    </>
  )
}

export default Report