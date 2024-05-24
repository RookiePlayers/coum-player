import { Alignment, Column, Row, Stack } from "ruki-react-layouts"
import { styles } from "./styles"
import { IconButton, Typography } from "@mui/material"
import { ArrowBackIos, Close, LibraryMusicRounded, Menu, QueueMusic, Settings } from "@mui/icons-material"
import { motion } from "framer-motion"
import { User } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { ProfileAvatar } from "./Components/profile_avatar"
import { CoumDrawer, CoumDrawerTab, kDrawerWidth } from "./Components/drawer"
import { useEffect, useState } from "react"
import { QueuePage } from "./pages/QueuePage"
import { LibraryPage } from "./pages/LibraryPage"
import { SettingsPage } from "./pages/SettingPage"

const CoumTabs: CoumDrawerTab[] = [
    {
        name: "Queue",
        icon: <QueueMusic style={styles.icon}/>,
        content: <QueuePage/>,
        index: 0
    },
    {
        name: "Library",
        icon: <LibraryMusicRounded style={styles.icon}/>,
        content: <LibraryPage/>,
        index: 1
    },
    {
        name: "Settings",
        icon: <Settings style={styles.icon}/>,
        content: <SettingsPage/>,
        index: 2
    }
] 

export const PlayerApp = ({onExit}: {onExit: ()=>void}) => {
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [openDrawer, setOpenDrawer] = useState<boolean>(true);
    const [pageInView, setPageInView] = useState<React.ReactNode>(CoumTabs[0].content);
    const handlePageSelected = (index: number) => {
        console.log("Page selected: ", index);
        setPageInView(CoumTabs[index].content);
    }
    const handleOpenMenu = ()=>{
        setOpenDrawer(!openDrawer);
    }
    return <Column style={styles.modal} alignment={Alignment.center} crossAlignment={Alignment.center}>
        <Column style={styles.modalContent}>
            <CoumDrawer onPageSelected={
                handlePageSelected
            } setOpen={setOpenDrawer} tabs={CoumTabs} open = {openDrawer} style={{width:"100%", height:"100%"}}>
                <Column style={{width:"100%", height:"100%"}}>
                    <BuildHeader onExit={onExit} open={openDrawer} onOpenMenu={handleOpenMenu} user={currentUser}/>
                    <Column style={{width:"100%", height:"100%"}}>
                        {pageInView}
                    </Column>
                </Column>
            </CoumDrawer>
        </Column>
    </Column>
}

const BuildHeader = ({user, onOpenMenu, open, onExit}: {user?: User; onOpenMenu: ()=>void; open: boolean;onExit: ()=>void}) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(open);
    useEffect(()=>{
        setOpenDrawer(open);
    },[open])
    return <Row style={{padding: 20,width:"100%"}} alignment={Alignment.spaceBetween} crossAlignment={Alignment.center}>
      <Row crossAlignment={Alignment.center} alignment={Alignment.left}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={onOpenMenu}>
                       {openDrawer ? <ArrowBackIos style={styles.bigIcon}/> : <Menu style={styles.bigIcon}/>}
                    </IconButton>
                </motion.div>
                <Typography variant="h5" style={styles.heading}>Coum Player</Typography>
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
