import React, { useEffect, useState } from 'react'
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
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getItems } from '../services/getItems';
import { addItem } from '../services/addItem';
import { deleteItem } from '../services/deleteItem';
import { updateItem } from '../services/updateItem';
import { changeStatus } from '../services/changeStatus';

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

  const location = useLocation();
  const productTypeId = location.pathname.split('/')[2]

  const [itemsData, setItemsData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTableData = itemsData.filter(item =>
    item.serial.toString().includes(searchTerm)
  );
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = (e) => {
//     const value = e.target.value
//     const filtered = itemsData.filter(item => item.serial.toString().includes(value))
//     setFilteredData(filtered)
//   }

  useEffect(() => {
    getItems(productTypeId).then((result) => {
        setItemsData(result.data)
        // setFilteredData(result.data)
    }).catch((err) => {
        console.log(err)
    })
  },[itemsData, productTypeId])

  const [newItem, setNewItem] = useState({
    name:"",
    serial: ""
  })

  const handleAddNewItem = (e) => {
    e.preventDefault();
    addItem(productTypeId, newItem).then((result)=> {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
  }

  const handleItemDelete = (itemId) => {
    deleteItem(itemId).then((result)=> {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
  }

  const handleChecked = (itemId) => {
    changeStatus(itemId).then((result)=> {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
  }

  const [editModal, setEditModal] = useState({
    id: "",
    name: "",
    serial: ""
  })

  const [editItem , setEditItem] = useState({
    name: "",
    serial: ""
  })

  const handleEditItem = (itemId) => {
    updateItem(editItem, itemId).then((result)=> {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
  }


  return (
    <div className='itemsDiv'>
    <Button className='navbtn' color="inherit">
        <Link className='navlink' to='/'><ArrowBackIcon/>Home</Link> 
    </Button>
    <h2 className='productTypeh1'>Items Page</h2>
    <div className="searchDiv">
      <TextField
          className='searchbar'
          id="outlined-multiline-flexible"
          label="Search By Serial Number"
          multiline
          maxRows={4}
          onChange={handleSearch}
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
            <TableCell align="center">SOLD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTableData.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {item.id}
              </TableCell>
              <TableCell align="center">
                {item.name}
              </TableCell>
              <TableCell align="center">
                {item.serial}
              </TableCell>
              <TableCell align="center">
                <Button className='productTypeButton' variant='contained' color='primary' onClick={()=>{
                    handleOpen2()
                    setEditModal(item)
                    }} >Edit</Button>
                <Button className='productTypeButton' variant='contained' color='error' onClick={() => handleItemDelete(item.id)}>Remove</Button>
              </TableCell>
              <TableCell align="center">
                <input type='checkbox' checked={item.checked} onChange={() => handleChecked(item.id)}/>
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
          <TextField id="standard-basic" label="Item Name" variant="standard" onChange={(e)=> {
              setNewItem({...newItem, name: e.target.value})
            }} />
          <TextField id="standard-basic" label="Item Serial Number" variant="standard" onChange={(e)=> {
              setNewItem({...newItem, serial: e.target.value})
            }}/>
          <Button className='addnewproducttypebutton' variant='contained' onClick={handleAddNewItem}>Submit</Button>
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
            Edit Item {editModal.id}
          </Typography>
          <TextField id="standard-basic" label={editModal.name} variant="standard" onChange={(e)=> {
              setEditItem({...editItem, name: e.target.value})
            }}  />
          <TextField id="standard-basic" label={editModal.serial} variant="standard" onChange={(e)=> {
              setEditItem({...editItem, serial: e.target.value})
            }}  />
          <Button className='addnewproducttypebutton' variant='contained' onClick={() => {handleEditItem(editModal.id)}}  >Submit Edit</Button>
        </Box>
      </Modal>
    </div>

  </div>
  )
}

export default ItemsPage