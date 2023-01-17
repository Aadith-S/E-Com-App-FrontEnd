import { AppBar,Box,Button,Toolbar, Typography ,IconButton, Tooltip, Menu, MenuItem, Avatar} from "@mui/material"
import React,{useState,useEffect} from "react"
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
      const [loggedIn,setLoggedIn] = useState<boolean>(false);
      if(loggedIn){
        dropDown = [{ text : "Profile",link : "/profile"},{text : "Add Product",link : "/addProduct"}];
      }
      else {
        dropDown = []
      }
      const logoutHandler = () => {
        googleLogout();
        setLoggedIn(false);
        localStorage.clear();
        setPicture(null)
        setOpen(false);
        navigate("/home");
        };
        const logincheck = () =>{
            if(localStorage.getItem("picture") != null){
                setPicture(localStorage.getItem("picture"));
                setLoggedIn(true);
            }
        }
        useEffect(logincheck,[picture]);
        const getLogged = () : any =>{
            if(loggedIn){
            return (
                <MenuItem>
                <Button style={{
                        color : "black",
                        textDecoration: "none"
                    }} onClick={logoutHandler}>Logout</Button>
                </MenuItem>
                )
            }
            else{
                return (
                    <MenuItem>
                    <Button style={{
                        color : "black",
                        textDecoration: "none"
                    }} onClick={handleOpen}>Login</Button>
                    </MenuItem>
                )
            }
        }    
    return (

        <Box sx={{ flexGrow: 1 }}>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home"  style={{
                color : "white",
                textDecoration: "none"
            }}> <Typography variant="h4">E-COM</Typography> </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Drop Down">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={picture !== null ? picture : undefined}/>
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
                    
                    <Button href={dropDown.link}  style={{
                        color : "black",
                        textDecoration: "none"
                    }}> <Typography>{dropDown.text}</Typography> </Button>
                </MenuItem>
              ))}
              {getLogged()}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    <Login open={open} setOpen={setOpen} setLoggedIn={setLoggedIn} setPicture={setPicture}/>
    </Box>
    )

}
