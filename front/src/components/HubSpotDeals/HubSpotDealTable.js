import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearAssignedWords, setAssignedWord } from '../../reducers/assignReducer'
//import { parseHubspotDealProperties } from '../../utils/hubspotDealHelper'
import { setDealId } from '../../reducers/dealIdReducer'


//Mui components
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { readyToSend } from '../../reducers/readyToSendReducer'


const HubSpotDealTable = () => {
  const deals = useSelector(state => state.hubspotDeals)
  const dispatch = useDispatch()

  console.log(deals)

  if(!deals) {
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Deal name
            </TableCell>
            <TableCell align='right'>
              Deal stage
            </TableCell>
            <TableCell align='right'>
              Close date
            </TableCell>
            <TableCell align='right'>
              Deal owner
            </TableCell>
            <TableCell align='right'>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  }

  /**
   * Parses the date to more readable format
   * @param {*} date
   */
  const parseDate = (date) => {
    if(!date) {
      return(
        'No date'
      )
    }

    const d = new Date(date)
    const year = d.getFullYear()
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const day = ('0' + d.getDate()).slice(-2)

    return(
      `${day}.${month}.${year}`
    )
  }

  const handleEditClick = (id) => {
    dispatch(clearAssignedWords())
    const deal = deals.find(d => d.id === id)
    //const obj = parseHubspotDealProperties(deal.properties)
    console.log(deal)
    const obj = {
      Price: deal.properties.amount && [deal.properties.amount],
      Customer: deal.properties.dealname && [deal.properties.dealname.substring(5)],
      Deadline: deal.properties.parsa_deadline && [deal.properties.parsa_deadline],
      Contact: deal.properties.hs_next_step && deal.properties.hs_next_step.split(','),
      FTEs: deal.properties.mrr_jan_23 && [deal.properties.mrr_jan_23],
      Technology: deal.properties.parsa_technologies && deal.properties.parsa_technologies.split(','),
    }
    dispatch(setDealId(id))
    dispatch(readyToSend())

    for(const category in obj) {
      const arr = obj[category]
      if(arr) {
        for(const word of arr) {
          dispatch(setAssignedWord(word, category))
        }
      }
    }
  }

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
                Deal name
            </TableCell>
            <TableCell align='right'>
                Deal stage
            </TableCell>
            <TableCell align='right'>
                Close date
            </TableCell>
            <TableCell align='right'>
                Deal owner
            </TableCell>
            <TableCell align='right'>
                Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} // Copypasta from mui table tutorial
            >
              <TableCell component='th' scope='row'>
                <IconButton size='small' onClick={() => handleEditClick(row.id)}>
                  <EditIcon fontSize='small'/>
                </IconButton>
                {row.properties.dealname}
              </TableCell>
              <TableCell align='right'>{row.properties.dealstage}</TableCell>
              <TableCell align='right'>{parseDate(row.properties.closedate)}</TableCell>
              <TableCell align='right'>{row.properties.owner}</TableCell>
              <TableCell align='right'>{row.properties.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HubSpotDealTable