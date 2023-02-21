import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '30px'
  };

const ItemsPage = () => {
    
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const productTypeData = [
  {
    id: 1,
    name: "Helicopter Lego",
    serialNumber: '3333',
  },
  {
    id: 2,
    name: "Batman Lego",
    serialNumber: '4444',
  },
];
  return (
    <div className='itemsDiv'>
    <h1 className='productTypeh1'>Items Page</h1>
    <div className="searchDiv">
      <TextField
          className='searchbar'
          id="outlined-multiline-flexible"
          label="Search By Serial Number"
          multiline
          maxRows={4}
        />
      <Button onClick={handleOpen} className='addnewproducttypebutton' variant='contained'>Add New Item</Button>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align="center">Serial Number</TableCell>
            <TableCell align="center">Tools</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productTypeData.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" className='productTableRow'>
                {item.id}
              </TableCell>
              <TableCell align="center" className='productTableRow'>
                {item.name}
              </TableCell>
              <TableCell align="center" className='productTableRow'>
                {item.serialNumber}
              </TableCell>
              <TableCell align="center">
                <Button className='productTypeButton' variant='contained' color='primary' onClick={handleOpen2} >Edit</Button>
                <Button className='productTypeButton' variant='contained' color='error'>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add A New Item
          </Typography>
          <TextField id="standard-basic" label="Item Name" variant="standard" />
          <TextField id="standard-basic" label="Item Serial Number" variant="standard" />
          <Button className='addnewproducttypebutton' variant='contained'>Submit</Button>
        </Box>
      </Modal>
    </div>

    <div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Item
          </Typography>
          <TextField id="standard-basic" label="New Name" variant="standard" />
          <TextField id="standard-basic" label="New Serial Number" variant="standard" />
          <Button className='addnewproducttypebutton' variant='contained'>Submit Edit</Button>
        </Box>
      </Modal>
    </div>

  </div>
  )
}

export default ItemsPage