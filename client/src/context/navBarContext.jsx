import { createContext, useState } from "react";

export const navBarContext=createContext(null)

export const NavBarContextProvider= ({children})=>{
    const [isVisible, setIsVisible]=useState(false)

    return (
        <navBarContext.Provider value={{isVisible, setIsVisible}}>
            {children}
        </navBarContext.Provider>
    )
}