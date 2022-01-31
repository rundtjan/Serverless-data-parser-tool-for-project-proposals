import React, { useState } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse'

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const Message = ({ message }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return(
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardContent>
          <Typography component='div'>
            {message.text} sent by {message.real_name}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              {message.thread_array.map(thread => (
                <li key={message.client_msg_id}>{thread.text}</li>
              ))}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

    </Grid>
  )
}

export default Message