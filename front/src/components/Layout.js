import React from 'react'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

//Tomi Testikama
import TestForm from './TestForm'

//Components
import DrawerParameters from './DrawerParameters'

const drawerWidth = 240


const Layout = ({ children }) => {

  console.log(children)

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`
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
        <TestForm />
      </Drawer>
      {/*Main area*/}
      <Box
        component='main'
      >
        <Toolbar />
        MAin area
      </Box>
    </Box>
  )
}

export default Layout