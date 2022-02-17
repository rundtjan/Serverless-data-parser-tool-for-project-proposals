import { makeStyles } from '@mui/styles'
import React from 'react'


const useStyles = makeStyles({
  page: {
    background: '#b3e5fc',
    width: '100%'
  }
})

const Layout = ({ children }) => {

  const classes = useStyles()

  return (
    <div>
      {/* App bar */}
      {/* Side drawer */}

      <div className={classes.page}>
        {children}
      </div>
    </div>
  )
}

export default Layout