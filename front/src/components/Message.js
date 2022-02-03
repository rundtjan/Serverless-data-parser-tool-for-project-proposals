import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { ListItem, Typography, List } from '@mui/material'
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
  const highlightWord = useSelector(state => state.highlightWord)


  /**
   * Parses the message to highlight the word which is hovered over with mouse
   * @returns Message with highlight
   */
  const parseMessageText = () => {

    if(highlightWord === '') {
      return(
        <Typography component='span'>
          {message.text} sent by {message.real_name}
        </Typography>
      )
    }

    const words = message.text.split(new RegExp(`(${highlightWord})`, 'gi'))

    return(
      <Typography component='span'>
        {words.map((word, index) => word.toLowerCase() === highlightWord.toLowerCase() ? <Typography key={index} component='span' color="#f44336">{word}</Typography> : word)} sent by {message.real_name}
      </Typography>
    )
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return(
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardContent>
          <Typography component='div'>
            {parseMessageText()}
            {message.thread_array.length !== 0 && <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>}
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              {message.thread_array.map(thread => (
                <ListItem key={thread.client_msg_id}>{thread.text} sent by {thread.real_name}</ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}

export default Message