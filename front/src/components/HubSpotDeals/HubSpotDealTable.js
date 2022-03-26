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
              <TableCell component='th' scope='row'>{row.properties.dealname}</TableCell>
              <TableCell align='right'>{row.properties.dealstage}</TableCell>
              <TableCell align='right'>{row.properties.closedate}</TableCell>
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

/*

              <TableCell component='th' scope='row'>{row.name}</TableCell>
              <TableCell align='right'>{row.stage}</TableCell>
              <TableCell align='right'>{row.closeDate}</TableCell>
              <TableCell align='right'>{row.owner}</TableCell>
              <TableCell align='right'>{row.amount}</TableCell>

*/