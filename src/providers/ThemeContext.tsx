import React, { createContext, useState } from "react"
import { IThemeContext } from "../interfaces/theme.interfaces";

export const ThemeContext = createContext({} as IThemeContext)

interface IThemeProviderProps{
    children: React.ReactNode
}

export const ThemeProvider = ({children}: IThemeProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);


    return (
        <ThemeContext.Provider value={{
            darkMode,
            setDarkMode
        }}>

            {children}
            
        </ThemeContext.Provider>
    )
}