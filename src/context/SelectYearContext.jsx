import React, { createContext, useState } from 'react'

export const SelectYearContext = createContext();

export const SelectYearProvider = ({children}) => {
    const [selectedYear, setSelectedYear] = useState('')
  return (
    <SelectYearContext.Provider value={{selectedYear, setSelectedYear}}>
        {children}
    </SelectYearContext.Provider>
  )
}

 