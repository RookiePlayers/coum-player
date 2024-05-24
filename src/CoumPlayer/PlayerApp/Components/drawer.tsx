import { Box, Divider, Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, CssBaseline, useTheme, IconButton } from "@mui/material";
import { colors } from "../../../colors";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Row } from "ruki-react-layouts";

export type CoumDrawerTab = {
    name: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    index: number;

}
type CoumDrawerProps = {
    tabs: CoumDrawerTab[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onPageSelected: (index: number) => void;
}
export const kDrawerWidth = 240;
const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    position: "relative", //imp
    width: kDrawerWidth, //drawer width
    height: "90%",
    "& .MuiDrawer-paper": {
      width: kDrawerWidth, //drawer width
      position: "absolute", //imp
      backgroundColor: colors.card,
      borderRadius: 20,
      margin: "15px 10px",
      color: colors.textPrimary,
    }
}))
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    padding: theme.spacing(3),
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${kDrawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export const CoumDrawer = ({
    tabs,
    open,
    setOpen,
    onPageSelected,
    children,
    style
}: CoumDrawerProps) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
  
    return (
      <Row style={style}>
        <CssBaseline />
        <Drawer
          sx={{
            width: kDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: kDrawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton> */}
          </DrawerHeader>
          <Divider />
          <List>
        {
            tabs.map((tab, index) => {
                return <ListItem key = {index} disablePadding>
                    <ListItemButton selected={
                        index === currentPage
                    } onClick={
                        ()=>{
                            setCurrentPage(index);
                            onPageSelected(index);
                        }
                    } >
                        <ListItemIcon>
                            {tab.icon}
                        </ListItemIcon>
                        <ListItemText primary={tab.name}/>
                    </ListItemButton>
                </ListItem>
            })
        }
        </List>
        </Drawer>
        <Main open={open}>
            {children}
        </Main>
      </Row>
    );
  }

{/* <List>
{
    tabs.map((tab, index) => {
        return <ListItem key = {index} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    {tab.icon}
                </ListItemIcon>
                <ListItemText primary={tab.name}/>
            </ListItemButton>
        </ListItem>
    })
}
</List> */}