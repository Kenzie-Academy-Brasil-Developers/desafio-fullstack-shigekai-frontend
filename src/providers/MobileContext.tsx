import { createContext, useEffect, useState } from "react"
import { IMobileContext } from "../interfaces/mobile.interface";

export const MobileContext = createContext({} as IMobileContext);

interface IMobileProviderProps{
    children: React.ReactNode
}

export const MobileProvider = ({children} : IMobileProviderProps) => {

    const[isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const resize = () => {
            setIsMobile(window.innerWidth < 798);
        };

        window.addEventListener("resize", resize);

        resize();

        return () => {
            window.removeEventListener("resize", resize);
        }

    }, []);



    return(
        <MobileContext.Provider value={{
            isMobile,
            setIsMobile
        }}>
            {children}
        </MobileContext.Provider>
    )
}