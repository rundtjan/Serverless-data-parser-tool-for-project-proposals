import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

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
    <div>
      <Typography variant='h5'>
        Words from messages
      </Typography>
      <ul>
        <Typography variant='body1'>
          {words.map(word =>
            <li key={word}>
              {word}
            </li>
          )}
        </Typography>
      </ul>
    </div>
  )
}

export default Words