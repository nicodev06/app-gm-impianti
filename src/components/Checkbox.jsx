import React, { useState } from 'react'

const Checkbox = () => {

  const [isActive, setIsActive] = useState(false);
    
  return (
    <button className={`checkbox ${isActive ? 'active' : 'disabled'}`} onClick={() => {setIsActive((prev) => !prev)}}>

    </button>
  )
}

export default Checkbox