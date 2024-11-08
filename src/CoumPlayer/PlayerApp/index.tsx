import { Alignment, Column, Row, Stack } from "ruki-react-layouts"
import { styles } from "./styles"
import { IconButton, Typography } from "@mui/material"
import { ArrowBackIos, ArrowForwardIosRounded, Close, LibraryMusicRounded, Menu, QueueMusic, Settings } from "@mui/icons-material"
import { motion } from "framer-motion"
import { User } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { ProfileAvatar } from "./Components/profile_avatar"
import { CoumDrawer, CoumDrawerMobile, CoumDrawerTab, kDrawerWidth } from "./Components/drawer"
import { useEffect, useState } from "react"
import { QueuePage } from "./pages/QueuePage"
import { LibraryPage } from "./pages/LibraryPage"
import { SettingsPage } from "./pages/SettingPage"
import { useMediaQuery } from "../../provider/media_query"
import { DiscoveryPage } from "./pages/DiscoveryPage"
import { useRouting } from "../../provider/routing"
import {MdFullscreen, MdFullscreenExit} from "react-icons/md"

const CoumTabs: CoumDrawerTab[] = [
    {
        name: "Discover",
        icon: <QueueMusic style={styles.icon}/>,
        content: <DiscoveryPage/>,
        index: 0
    },
    {
        name: "Queue",
        icon: <QueueMusic style={styles.icon}/>,
        content: <QueuePage/>,
        index: 1
    },
    {
        name: "Library",
        icon: <LibraryMusicRounded style={styles.icon}/>,
        content: <LibraryPage/>,
        index: 2
    },
    {
        name: "Settings",
        icon: <Settings style={styles.icon}/>,
        content: <SettingsPage/>,
        index: 3
    }
] 

export const PlayerApp = ({onExit}: {onExit: ()=>void}) => {

    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [openDrawer, setOpenDrawer] = useState<boolean>(true);
    const [pageInView, setPageInView] = useState<React.ReactNode>(CoumTabs[0].content);
    const {component, currentRoute, setRoute} = useRouting();
    

    useEffect(()=>{
        setRoute(CoumTabs[0].name, CoumTabs[0].content);
    }
    ,[])
    const handlePageSelected = (index: number) => {
        console.log("Page selected: ", index);
        setRoute(CoumTabs[index].name, CoumTabs[index].content);
        setPageInView(component);
    }
    const handleOpenMenu = ()=>{
        setOpenDrawer(!openDrawer);
    }
    return <Column style={styles.modal} alignment={Alignment.center} crossAlignment={Alignment.center} className="playe-app">
        <Column style={styles.modalContent}>
            <CoumDrawer onPageSelected={
                handlePageSelected
            } setOpen={setOpenDrawer} tabs={CoumTabs} open = {openDrawer} style={{width:"100%", height:"100%"}}>
                <Column style={{width:"100%", height:"100%"}}>
                    <BuildHeader onExit={onExit} open={openDrawer} onOpenMenu={handleOpenMenu} user={currentUser}/>
                    <Column style={{width:"100%", height:"100%", overflowY:"auto"}}>
                        {component}
                    </Column>
                </Column>
            </CoumDrawer>
        </Column>
    </Column>
}

const BuildHeader = ({user, onOpenMenu, open, onExit}: {user?: User; onOpenMenu: ()=>void; open: boolean;onExit: ()=>void}) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(open);
    const {forwardHistory, goForward, history, goBack} = useRouting()
    useEffect(()=>{
        setOpenDrawer(open);
    },[open])
    return <Row style={{paddingBottom: 20,width:"100%"}} alignment={Alignment.spaceBetween} crossAlignment={Alignment.center}>
      <Row crossAlignment={Alignment.center} alignment={Alignment.left}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={onOpenMenu}>
                       {openDrawer ? <MdFullscreen style={styles.bigIcon}/> : <MdFullscreenExit style={styles.bigIcon}/>}
                    </IconButton>
                </motion.div>
                <Typography variant="h5" style={styles.heading}>Coum Player</Typography>
                <Row crossAlignment={Alignment.center} style={{marginLeft: 10}}>
                    
                <motion.div 
                animate = {{
                    opacity: history.length > 0 ? 1 : 0.3
                }}
                onClick={()=>{
                    goBack()
                }}
                whileHover={{ scale: 1.1, cursor: 'pointer' }} whileTap={{ scale: 0.9 }}>
                       <Column>
                            <ArrowBackIos style={{...styles.bigIcon, fontSize: 20}}/>
                       </Column>
                </motion.div>
                
                <motion.div
                onClick={()=>{
                    goForward()
                }} animate={{
                    opacity: forwardHistory.length > 0 ? 1 : 0.3
                }} whileHover={{ scale: 1.1, cursor: 'pointer' }} whileTap={{ scale: 0.9 }}>
                      <Column>
                      <ArrowForwardIosRounded  style={{...styles.bigIcon, fontSize: 20}}/>
                      </Column>
                </motion.div>
                </Row>
      </Row>
          <Row crossAlignment={Alignment.center}>
          <ProfileAvatar profile={user} /><motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton onClick={onExit}>
                <Close style={styles.bigIcon}/>
            </IconButton>
        </motion.div>
          </Row>
    </Row>
}
