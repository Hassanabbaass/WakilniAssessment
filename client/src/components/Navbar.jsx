import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


const Navbar = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='navstyle' position="static">
                <Toolbar>
                    <Typography className='navtitle' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        INVENTORY
                    </Typography>
                    <Button className='navbtn' color="inherit">
                        <Link className='navlink' to='/'>Product Types</Link> 
                    </Button>
                    {/* <Button className='navbtn' color='inherit'>
                        <Link className='navlink' to='/items'>Items</Link>
                    </Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default Navbar