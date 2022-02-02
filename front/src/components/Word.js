import React, { useState } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

const Word = ({ obj }) => {
  const [checked, setChecked] = useState(false)

  const handleToggle = () => {
    setChecked(!checked)
  }


  return(
    <ListItem
      key={obj.word}
      disableGutters
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle}
          checked={checked}
        />
      }
    >
      <ListItemText>
        {obj.word}: {obj.count}
      </ListItemText>

    </ListItem>
  )
}

export default Word