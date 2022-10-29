import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { logout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { Button } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };
  const { isAuthenticated } = useSelector((state) => state.user);

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  const HomeHandler = () => {
    navigate("/");
  };
  const handleMenu = (event) => {
   // setAnchorEl(event.currentTarget);

  };

  const AccountHandler = () =>{
    navigate('/admin/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor:"#d291bc"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }}
          onClick={HomeHandler}
            style={{ cursor: "pointer" , fontFamily:"Roboto"}}
          >
            Event Management
          </Typography>
          
            <div onClick={AccountHandler} style={{visibility:"hidden"}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                {/* {isAuthenticated && isAuthenticated ? (
                <Button style={{ color: "white" }}>
                  Logout
                </Button>
              ) : (
                <AccountCircle />
              )} */}
              </IconButton>
              
            </div>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}


//export default Header