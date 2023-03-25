import React, {createContext, useState} from 'react'

export const Context = createContext();

const HomepageContext = ({ children }) => {

  const [archived, setArchived] = useState(null);  

  return (
    <Context.Provider
    value={{
        archived,
        setArchived
    }}
    >
        { children }
    </Context.Provider>
  )
}

export default HomepageContext