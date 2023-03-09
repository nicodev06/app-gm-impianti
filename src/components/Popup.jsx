import React from 'react'

const Popup = ({children, handleClose}) => {
  return (
    <div className='app__popup'>
        <div className='app__popup-children'>
          <div className='close-popup'>
              <div role='button' onClick={handleClose}>
                  <h4>X</h4>
              </div>
          </div>
          {children}
        </div>
    </div>
  )
}

export default Popup