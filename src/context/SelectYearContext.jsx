import React, { createContext, useState } from 'react'

export const SelectYearContext = createContext();

export const SelectYearProvider = ({children}) => {
    const [selectedYear, setSelectedYear] = useState('')
    const [role, setRole] = useState('')
  return (
    <SelectYearContext.Provider value={{selectedYear, setSelectedYear, role, setRole}}>
        {children}
    </SelectYearContext.Provider>
  )
}

 