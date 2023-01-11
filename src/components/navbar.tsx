import { AppBar,Box,Button,Toolbar, Typography ,IconButton, Tooltip, Menu, MenuItem, Modal, Avatar} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React,{useState,useEffect, useReducer,useRef} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./login";
import { googleLogout } from "@react-oauth/google";
interface DropDown {
    text : string;
    link : string;
}
export const Navbar = ()=>{
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    var dropDown : DropDown[];
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
    //   const [loggedIn,setLoggedIn] = useReducer((state) => {return !state;}, false);
        const loggedIn = useRef(false);
      if(loggedIn.current){
        dropDown = [{ text : "Profile",link : "/profile"},{text : "View Cart",link : "cart"},{text : "Wishlist",link : "/wishlist"},{text : "Add Product",link : "/addProduct"}];
      }
      else {
        dropDown = []
      }
      const logoutHandler = () => {
        googleLogout();
        loggedIn.current = false;
        localStorage.clear();
        setPicture(null)
        setOpen(false);
        navigate("/home");
        };
        const logincheck = () =>{
            console.log("in check");
            if(localStorage.getItem("picture") != null){
                setPicture(localStorage.getItem("picture"));
                console.log("in setLogged");
                loggedIn.current = true;
            }
        }
        useEffect(logincheck,[,picture]);
        const getProPic : any = () =>{
            if(picture === null){
                return <AccountCircleIcon fontSize="large"/>
            }
            else{
                console.log(picture);
               return <Avatar src={picture}/>
            }
        }
        console.log(loggedIn);
        const getLogged = () : any =>{
            if(loggedIn.current){
            return (
                <MenuItem>
                <Button onClick={logoutHandler}>Logout</Button>
                </MenuItem>
                )
            }
            else{
                return (
                    <MenuItem>
                    <Button onClick={handleOpen}>Login</Button>
                    </MenuItem>
                )
            }
        }
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
                {getProPic()}
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
                    
                    <Link to={dropDown.link}  style={{
                        color : "black",
                        textDecoration: "none"
                    }}> <Typography>{dropDown.text}</Typography> </Link>
                </MenuItem>
              ))}
              {getLogged()}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    <Login open={open} setOpen={setOpen} ref={loggedIn}/>
    </Box>
    )

}
