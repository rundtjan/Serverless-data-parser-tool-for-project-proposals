import React from 'react'
import { useSelector } from 'react-redux'

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


const HubSpotDealTable = () => {
  const deals = useSelector(state => state.hubspotDeals)

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
    const d = new Date(date)
    const year = d.getFullYear()
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const day = ('0' + d.getDate()).slice(-2)

    return(
      `${day}.${month}.${year}`
    )
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
                <IconButton size='small'>
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