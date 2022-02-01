import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import List from '@mui/material/List'

import Word from './Word'

const Words = () => {
  const words = useSelector(state => state.data.words)

  if(!words) {
    return(
      <Typography variant='body2'>
        Loading words...
      </Typography>
    )
  }

  return (
    <Typography>
      <Typography variant='h5'>
        Words from messages
      </Typography>
      <List dense >
        {words.map(obj => (
          <Word key={obj.word} obj={obj}/>
        ))}
      </List>
    </Typography>
  )
}

export default Words