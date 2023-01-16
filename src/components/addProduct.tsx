

import { Alert, Box, Button, Card, CardContent, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import {useMutation} from "react-query"
import { addProduct } from '../services/products'

export const AddProduct = () => {
    const [productName,setProductName] = useState<string>("")
    const [productPrice,setProductPrice] = useState<string>("")
    const [productImage,setProductImage] = useState<string>("")
    const {mutate,isSuccess} = useMutation(addProduct);
    const [error,setError] = useState<string>("")
    const regexQuery = "/(http(s)?://.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/";
    var url = new RegExp(regexQuery,"g");
    const checkError = ()=>{
      if(productName.length === 0){
        setError("Product Name is empty");
        return false;
      }
      else if(isNaN(+productPrice)){
        setError("Price must be a number");
        return false;
      }
      else if(!productPrice){
        setError("Price Field is empty");
        return false;
      }
      else if(productImage.length === 0){
        setError("Product Image is empty");
        return false;
      }
      else if(!url.test(productImage)){
        setError("Product image link is Invalid")
        return false;
      }
      else{
        setError("");
        return true;
      }
    }
    const productHandler = () => {
        if(checkError()){
          mutate({
            productName: productName,
            productPrice: parseInt(productPrice),
            productImage: productImage
        });
        setProductName("");
        setProductPrice("");
        setProductImage("");
        }
    }
  return (
    <Box sx={{
        marginLeft : 50,
        marginTop : 10,
        marginRight : "auto",
        height : 10,
        width : 500
      }}>
        <Card>
        <CardContent>
          <Stack direction="row" spacing={3}>
          <TextField label="Product Name" variant='standard' value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
          </Stack>
          <Stack direction="row" spacing={3}>
          <TextField label="Product Price" variant='standard' value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}}/>
          </Stack>
          <Stack direction="row" spacing={3}>
          <TextField label="Product Image Link" variant='standard' value={productImage} onChange={(e)=>{setProductImage(e.target.value)}}/>
          </Stack>
          <Stack sx={{marginTop : 5}}>
            <Button variant = "contained" onClick={productHandler}>Add Product</Button>
          </Stack>
        </CardContent>
      </Card> 
      {isSuccess && <Alert severity='success'>Product Added</Alert>}    
      {error && <Alert severity='error'>{error}</Alert>}
      </Box>
  )
}
