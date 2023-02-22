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
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getProductTypes } from '../services/getProductTypes';
import { addProductType } from '../services/addProductType';
import { deleteProductTypes } from '../services/deleteProductType';
import { updateProductType } from '../services/updateProductType';

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

const ProductTypesPage = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const navigate = useNavigate();

    const [newProductType, setNewProductType] = useState({
      product_type_name: "",
      image: ""
    })

    const handleAddProductType = (e) => {
      e.preventDefault();
      addProductType(newProductType).then((result) => {
        console.log(result.data)
      }).catch((err)=> {
        console.log(err)
      })
    }

    const handleRemoveProductType = (prodTypeId) => {
      deleteProductTypes(prodTypeId).then((result) => {
        console.log(result)
      }).catch((err)=> {
        console.log(err)
      })
    }
    
    const [editModal, setEditModal] = useState({
      id: "",
      product_type_name: "",
      image: ""
    })

    const [editProductType , setEditProductType] = useState({
      product_type_name: "",
      image: ""
    })
    const handleEditProductType = (prodTypeId) => {
      updateProductType(editProductType, prodTypeId).then((result) => {
        console.log(result)
      }).catch((err)=> {
        console.log(err)
      })
    }

    const [productTypeData, setProductTypeData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value)
      const filtered = productTypeData.filter(item => item.product_type_name.toLowerCase().includes(value))
      setFilteredData(filtered)
    }

    useEffect(() => {
      getProductTypes().then((result) => {
        setProductTypeData(result.data)
        setFilteredData(result.data)
      }).catch((err) => {
        console.log(err)
      })
    }, [])

  const handleGoTo = (id) => {
    navigate(`/items/${id}`)
  }

  return (
    <div className='productTypeDiv'>
      <h2 className='productTypeh1'>Product Type Page</h2>
      <div className="searchDiv">
        <TextField
            className='searchbar'
            id="outlined-multiline-flexible"
            label="Search by product type name"
            multiline
            maxRows={4}
            onChange={handleSearch}
          />
        <Button onClick={handleOpen} className='addnewproducttypebutton' variant='contained'>Add New Product Type</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Image</TableCell>
              <TableCell align='center'>ID</TableCell>
              <TableCell align="center">Product Type Name</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Tools</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' className='productTableRow' onClick={()=>handleGoTo(item.id)}>
                  <img className='productTypeImageStyle' alt='' src={item.image}/>
                </TableCell >
                <TableCell align="center" className='productTableRow' onClick={()=>handleGoTo(item.id)}>
                  {item.id}
                </TableCell>
                <TableCell align="center" className='productTableRow' onClick={()=>handleGoTo(item.id)}>
                  {item.product_type_name}
                </TableCell>
                <TableCell align="center" className='productTableRow' onClick={()=>handleGoTo(item.id)}>
                  {item.itemcount}
                </TableCell>
                <TableCell align="center">
                  <Button className='productTypeButton' variant='contained' color='primary' onClick={()=>{
                    handleOpen2()
                    setEditModal(item)
                    }} >Edit</Button>
                  <Button className='productTypeButton' variant='contained' color='error' onClick={() => handleRemoveProductType(item.id)}>Remove</Button>
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
              Add A New Product Type
            </Typography>
            <TextField id="standard-basic" label="Product Type Name" variant="standard" onChange={(e)=> {
              setNewProductType({...newProductType, product_type_name: e.target.value})
            }} />
            <TextField id="standard-basic" label="Image URL" variant="standard" onChange={(e)=> {
              setNewProductType({...newProductType, image: e.target.value})
            }} />
            <Button className='addnewproducttypebutton' variant='contained' onClick={handleAddProductType}>Submit</Button>
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
              Edit Product Type {editModal.id}
            </Typography>
            <TextField id="standard-basic" label={editModal.product_type_name} variant="standard" onChange={(e)=> {
              setEditProductType({...editProductType, product_type_name: e.target.value})
            }} />
            <TextField id="standard-basic" label={editModal.image} variant="standard" onChange={(e)=> {
              setEditProductType({...editProductType, image: e.target.value})
            }}/>
            <Button className='addnewproducttypebutton' variant='contained' onClick={() => {handleEditProductType(editModal.id)}}>Submit Edit</Button>
          </Box>
        </Modal>
      </div>

    </div>
  )
}

export default ProductTypesPage