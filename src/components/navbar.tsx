import { AppBar,Box,Button,Toolbar, Typography ,IconButton, Tooltip, Menu, MenuItem, Modal} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React,{useState} from "react"
import { Link } from "react-router-dom";
import { Login } from "./login";
interface DropDown {
    text : string;
    link ?: string;
}
export const Navbar = ()=>{
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dropDown : DropDown[] = [{ text : "Profile",link : "/profile"},{text : "Logout",link : "logout"}];
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
                <AccountCircleIcon fontSize="large"/>
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
              <Button onClick={handleOpen}>Login</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    <Login open={open} setOpen={setOpen}/>
    </Box>
    )

}
