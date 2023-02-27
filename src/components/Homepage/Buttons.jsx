import React from 'react'

import { Link } from 'react-router-dom';

const Buttons = () => {
  return (
    <div className='projects__buttons'>
        <section className='first-section'>
            <button>
                <h3>TUTTI I PROGETTI</h3>
            </button>
            <button>
                <h3>ARCHIVIATI</h3>
            </button>
        </section>
        <section className='second-section'>
            <Link to='aggiorna-ore'>
                <button>
                    <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
                    <h2>AGGIORNA ORE LAVORATIVE</h2>
                </button>
            </Link>
            <p>Inserisci giornalmente le ore che hai lavorato e su quale progetto</p>
        </section>
        <section className='third-section'>
            <Link to='/crea-rapporto'>
                <button>
                    <button className='add' style={{border: 'none', width: '1.2rem', marginRight: '1rem'}}>+</button>
                    <h2>CREA RAPPORTO</h2>
                </button>
            </Link>
            <p>Potrai creare un rapporto <strong>complessivo</strong> o <strong>giornaliero</strong> partendo da un progetto. <br /> Nota: il rapporto giornaliero non modificherà le ore inserite.</p>
        </section>
    </div>
  )
}

export default Buttons