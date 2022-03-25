import React from 'react'

//Mui components
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'

const createTestData = (name, stage, closeDate, owner, amount ) => {
  return { name, stage, closeDate, owner, amount }
}

const testHubData = [
  createTestData('HardCoded Test deals', 'Lead', 'Feb 1, 2022', 'Geralt', '€1,000'),
  createTestData('HardCoded Test deals 1', 'Offer sent', 'Feb 14, 2022', 'Turing', '€125,000'),
  createTestData('HardCoded Test deals 2', 'Lead', 'Jan 5, 2022', 'Mark', '€182,000'),
  createTestData('HardCoded Test deals 3', 'Lead', 'Dec 24, 2022', 'Pope', '€56,000'),
  createTestData('HardCoded Test deals 4', 'Confirmed', 'Apr 15, 2022', 'Ronaldo', '€12,000'),
]


const HubSpotDeals = () => {

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
          {testHubData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} // Copypasta from mui table tutorial
            >
              <TableCell component='th' scope='row'>{row.name}</TableCell>
              <TableCell align='right'>{row.stage}</TableCell>
              <TableCell align='right'>{row.closeDate}</TableCell>
              <TableCell align='right'>{row.owner}</TableCell>
              <TableCell align='right'>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HubSpotDeals