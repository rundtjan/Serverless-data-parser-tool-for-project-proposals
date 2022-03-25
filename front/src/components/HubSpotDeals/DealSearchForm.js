/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

//Actions
import { getAllHubspotDealsWithName } from '../../reducers/hubspotReducer'


//Mui stuff
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'




const DealSearchForm = () => {
  const [dealName, setDealName] = useState('')

  const dispatch = useDispatch()

  const handleDealSearch = async() => {
    dispatch(getAllHubspotDealsWithName(dealName))
    setDealName('')
  }

  const handleGetAllDeals = () => {
    console.log('Getting all deals')
  }


  return(
    <Box
      bgcolor='#f9f9f9'
      sx={{
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='dealNameSearch'
            value={dealName}
            onChange={({ target }) => setDealName(target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleDealSearch}
          >
            Search
          </Button>
          <Button
            onClick={handleGetAllDeals}
          >
            Find All
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DealSearchForm