import React from 'react'
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * Component for Json of assigned words.
 * @returns Grid containing Json that is equal to the one that can be sent to Hubspot.
 */
const JsonOfCategories = () => {
  const assignedWords = useSelector(state => state.assignedWords)


  const makeJson = (assignedWords) => {
    const JSONObj = {}
    assignedWords.forEach(word => {
      if (!JSONObj[word.category]) JSONObj[word.category] = []
      JSONObj[word.category].push(word.word)
    })
    return JSONObj
  }

  const json = makeJson(assignedWords)

  return (
    <Box sx={{ p:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' textAlign='left' component='div'>
              JSON to Hubspot
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography key={json}>
            { JSON.stringify(json) }
          </Typography>
        </Grid>

      </Grid>
    </Box>
  )

}
export default JsonOfCategories