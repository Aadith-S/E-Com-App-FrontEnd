import { AppBar,Box,Button,Toolbar, Typography ,IconButton, Tooltip, Menu, MenuItem, Modal, Avatar} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./login";
import { googleLogout } from "@react-oauth/google";
import { useQuery } from "react-query";
import { getProfile } from "../services/profile";
interface DropDown {
    text : string;
    link ?: string;
}
export const Navbar = ()=>{
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dropDown : DropDown[] = [{ text : "Profile",link : "/profile"},{text : "View Cart",link : "cart"},{text : "Wishlist",link : "/wishlist"}];
      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const [open,setOpen] = useState(false);
      const handleOpen = ()=>{
        setOpen(true);
      }
      const [picture,setPicture] = useState<null | string>(null);
      const [loggedIn,setLoggedIn] = useState(false);
      const logoutHandler = () => {
        googleLogout();
        setLoggedIn(false);
        console.log("Logout Succesful");
        localStorage.clear();
        setPicture(null)
        setOpen(false);
        navigate("/home");
        };
        const OnSuccess = ()  => {
            setPicture(data?.data.profilePicture);
        }
      const {data} = useQuery("userData",getProfile,{onSuccess : OnSuccess,refetchInterval : 6000 });
    return (

        <Box sx={{ flexGrow: 1 }}>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Button variant="text" color="white" size="large" href="/home">E-COM</Button> */}
            <Link to="/home"  style={{
                color : "white",
                textDecoration: "none"
            }}> <Typography variant="h4">E-COM</Typography> </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Drop Down">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!picture && <AccountCircleIcon fontSize="large"/>}
                {picture && <Avatar alt = "Profile Picture" src={picture}/>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {dropDown.map((dropDown) => (
                <MenuItem key={dropDown.text} onClick={handleCloseUserMenu}>
                    
                    <Link to={dropDown.text}  style={{
                        color : "black",
                        textDecoration: "none"
                    }}> <Typography>{dropDown.text}</Typography> </Link>
                </MenuItem>
              ))}
              <MenuItem>
              {!loggedIn && <Button onClick={handleOpen}>Login</Button>}
              </MenuItem>
              <MenuItem>
              {loggedIn && <Button onClick={logoutHandler}>Logout</Button>}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    <Login open={open} setOpen={setOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </Box>
    )

}
