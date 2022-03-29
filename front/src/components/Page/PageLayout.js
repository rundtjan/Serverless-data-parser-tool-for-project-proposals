import React from 'react'

//Mui components
import Grid from '@mui/material/Grid'

//Components
import Layout from '../Layout'
import Messages from '../Messages'
import Words from '../Words'
import Categories from '../Categories'
import HubSpotDealTable from '../HubSpotDeals/HubSpotDealTable'

const PageLayout = () => {


  return(
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Messages />
        </Grid>
        <Grid item xs={4}>
          <Words />
        </Grid>
        <Grid item xs={12}>
          <Categories />
        </Grid>
        <Grid item xs={12}>
          <HubSpotDealTable />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PageLayout