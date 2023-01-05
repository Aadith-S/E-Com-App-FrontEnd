import { Card, CardContent, Grid, Typography} from '@mui/material'
import React from 'react'
interface Product {
    name : string,
    price : number
}
const products : Product[] = [{name : "Some Name", price : 120},{name : "Another Name", price : 220}]
export const Products = () => {
    function getCard(product : Product,index : any): any {
        return (
            <Grid item xs={2}>
            <Card key={index} sx={{width : 200}}>
                <CardContent>
                    <Typography variant='h6'>
                        {product.name}
                    </Typography>
                    <Typography variant='body1'>
                        {product.price}
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
        )
    }
  return (
    <Grid container spacing={1} sx={{marginLeft : 30,marginTop : 10}} >
        {products.map(getCard)}
    </Grid>
  )
}
