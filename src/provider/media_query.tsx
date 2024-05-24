import React, { useContext } from "react";
import { createContext, useEffect,useState } from "react";
type MediaQueryContextType = {
    device: "xs" | "md" | "pc" | "lg" | "xl";
    deviceSize: {
        w: string;
        h: string;
    };
    setBreakpoints: (breakpoints: { [key: string]: number }) => void;
    updateDevice: () => void;
    isLargeDevice: boolean;
    isSmallDevice: boolean;
    drawerWidth: number | string;
    isPC: boolean;

}

export const MediaQueryContext = createContext<MediaQueryContextType | null>(null);
export const useMediaQuery = () => {
    const context = useContext(MediaQueryContext);
    if (!context) {
        throw new Error('useMediaQuery must be used within a MediaQueryProvider');
    }
    return context;

}

export default function MediaQueryProvider(props: { children: React.ReactNode }) {

    
    const [device,setDevice] = useState<"xs" | "md" | "pc" | "lg" | "xl">("pc");

    const [deviceSize, updateSize] = useState({ "w": "100%", "h": "100%" })
    const [breakpoints,setBreakpoints] = useState<{ [key: string]: number }>({
        "xs":600,
        "md":1200,
        "pc":1440,
        "lg":1620,
        "xl":2080
    });
    const drawerWidth = device === "xs" ? "80vw" : 280;
    const isLargeDevice = device === "pc" || device === "lg" || device === "xl";
    const isSmallDevice = device === "xs";
    useEffect(()=>{
        updateDevice();
        //updateSize({ "w": window.innerWidth, "h": window.innerHeight - 6 })
        window.addEventListener("resize",updateDevice);
    })
    const updateDevice = ()=>{
       
        if(window.innerWidth<=breakpoints.xs)
        {
            setDevice('xs');
        }else if(window.innerWidth<=breakpoints.md&&window.innerWidth>breakpoints.xs){
            setDevice('md');
        }
        else if(window.innerWidth<=breakpoints.pc&&window.innerWidth>breakpoints.md){
            setDevice('pc');
        }
        else if(window.innerWidth<=breakpoints.lg&&window.innerWidth>breakpoints.pc){
            setDevice('lg');
        }
        else {
            setDevice('xl')
          }
       //   console.log(device)
    }
    return <MediaQueryContext.Provider value={{
        device,
        deviceSize,
        setBreakpoints,
        updateDevice,
        isLargeDevice,
        isSmallDevice,
        drawerWidth,
        isPC: device === "pc",
    }}>
        {props.children}
    </MediaQueryContext.Provider>
}