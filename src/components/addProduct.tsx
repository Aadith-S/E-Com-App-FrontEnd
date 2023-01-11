

import { Box, Button, Card, CardContent, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useMutation} from "react-query"
import { addProduct } from '../services/products'

export const AddProduct = () => {
    const [productName,setProductName] = useState<string>("")
    const [productPrice,setProductPrice] = useState<string>("")
    const [productImage,setProductImage] = useState<string>("")
    const {mutate} = useMutation(addProduct);
    const productHandler = () => {
        mutate({
            productName: productName,
            productPrice: parseInt(productPrice),
            productImage: productImage
        })
    }
    console.log(productName,productPrice,productImage);
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
          <TextField label="Product Name" variant='standard' onChange={(e)=>{setProductName(e.target.value)}}/>
          </Stack>
          <Stack direction="row" spacing={3}>
          <TextField label="Product Price" variant='standard' onChange={(e)=>{setProductPrice(e.target.value)}}/>
          </Stack>
          <Stack direction="row" spacing={3}>
          <TextField label="Product Image Link" variant='standard' onChange={(e)=>{setProductImage(e.target.value)}}/>
          </Stack>
          <Stack sx={{marginTop : 5}}>
            <Button variant = "contained" onClick={productHandler}>Add Product</Button>
          </Stack>
        </CardContent>
      </Card> 
      </Box>
  )
}
