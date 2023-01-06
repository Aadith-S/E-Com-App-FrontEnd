import { Card, CardContent, Grid, Typography,CardMedia, Button} from '@mui/material'
import React from 'react'
interface Product {
    product_name : string,
    price : number,
    product_image : string
}
const products : Product[] = [{product_name : "Some Name", price : 120,product_image : "asd"},{product_name : "Another Name", price : 220,product_image : ""}]
export const Products = () => {
    function getCard(product : Product,index : any): any {
        return (
            <Grid item xs={2.2}>
            <Card key={index} sx={{width : 200}}>
                <CardMedia style={{height:180}} image="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&w=1000&q=80" />
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
  return (
    <Grid container spacing={5} sx={{marginLeft : 30,marginTop : 10}} >
        {products.map(getCard)}
    </Grid>
  )
}
