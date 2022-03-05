import React, { createContext, useReducer } from 'react'
import { themeReducer } from '../services/reducers/themeReducer';

export const ThemeContext = createContext();
const initialState = { darkMode: false };

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState,);

  return (
    <ThemeContext.Provider value={{
      state,
      dispatch 
    }}>
      { children }
    </ThemeContext.Provider>
  )
}
