import React from 'react'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CssBaseline from '@mui/material/CssBaseline'


//Components
import DrawerParameters from './DrawerParameters'
import ParametersForm from './ParametersForm'
import SendToHubspot from './SendToHubspot'
import JsonOfCategories from './JsonOfCategories'

const drawerWidth = 240


const Layout = ({ children }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#c8e6c9'
      }}
    >
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
          >
            Parsa-App
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        anchor='left'
        variant='permanent'
      >
        <Toolbar />
        <Divider />
        <DrawerParameters />
        <Divider />
        <ParametersForm />
        <Divider />
        <SendToHubspot />
        <Divider />
        <JsonOfCategories />
      </Drawer>
      {/*Main area*/}
      <Box
        component='main'
        sx={{ flexGrow:1, p: 3 }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}

export default Layout