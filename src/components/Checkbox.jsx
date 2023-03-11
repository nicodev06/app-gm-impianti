import React, { useState } from 'react'

const Checkbox = ({ handler, val }) => {

  const [isActive, setIsActive] = useState(false);
    
  return (
    <button className={`checkbox ${isActive ? 'active' : 'disabled'}`} onClick={() => {
      handler(!isActive, val)
      setIsActive((prev) => !prev)
    }}>

    </button>
  )
}

export default Checkbox