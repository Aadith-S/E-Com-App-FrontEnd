import { Card, CardContent, Grid, Typography,CardMedia, Button} from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getProduct } from '../services/products';
interface Product {
    product_name : string,
    price : number,
    product_image : string
}
export const Products = () => {

    const {data,isSuccess,isLoading} = useQuery("products",getProduct ,{onSuccess :()=>{
        console.log(data);
    }});
    // const products : Product[] = [{product_name : "Some Name", price : 120,product_image :"https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&w=1000&q=80"},{product_name : "Another Name", price : 220,product_image : "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}]
    function getCard(product : Product,index : any): any {
        return (
            <Grid item xs={2.2}>
            <Card key={index} sx={{width : 200}}>
                <CardMedia style={{height:180}} image={product.product_image} />
                <CardContent>
                    <Typography variant='h6'>
                        {product.product_name}
                    </Typography>
                    <Typography variant='body1'>
                        {product.price}
                    </Typography>
                    <Button variant='contained'size='small'>Add to cart</Button>
                </CardContent>
            </Card>
            </Grid>
        )
    }
    if(isLoading){
        console.log("in loading");
        return <>Loading./....</>
    }
  return (
    <Grid container spacing={5} sx={{marginLeft : 30,marginTop : 10}} >
        {data && data.data.map(getCard)}
    </Grid>
  )

}
