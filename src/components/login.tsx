import {Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React,{useState} from 'react'
import { googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
interface prop{
    open : boolean,
    setOpen : (value:boolean)=> void,
    loggedIn : boolean,
    setLoggedIn : (value:boolean)=>void
}
export const Login = (props:prop) => {
    const handleClose = ()=>{
        props.setOpen(false);
        props.setLoggedIn(true);
        }
    const loginHandler = (credentialResponse: any) => {



        console.log(credentialResponse.credential);
    
    
    
    
    
        if (credentialResponse.credential !== undefined) {
    
            props.setLoggedIn(true);
    
            var decoded : any = jwt_decode(credentialResponse.credential);
    
            localStorage.setItem('token',credentialResponse.credential);

            console.log(decoded);
            props.setOpen(false);
    
        }
    
    
    
        };
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  return (
    <Box>
        <Modal
      open={props.open}
      onClose={handleClose}
      >
        <Box sx={style}>
        <GoogleOAuthProvider 
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                >
             <GoogleLogin
              onSuccess={loginHandler}
              onError={()=>console.log("Error Occured")}
            useOneTap
            />
            </GoogleOAuthProvider>
        </Box>
      </Modal>
    </Box>
  )
}
