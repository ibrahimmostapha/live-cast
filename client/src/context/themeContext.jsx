import { createContext, useEffect, useState } from "react";

export const themeContext=createContext(null)

export function ThemeContextProvider({children}){
    const [theme,setTheme]=useState(true)
    
    function themeToggle(value){
        // window.localStorage.setItem('theme', value)
        setTheme(value)
    }
    
    return (
        <themeContext.Provider value={{theme, themeToggle}}>
            {children}
        </themeContext.Provider>
    )
}