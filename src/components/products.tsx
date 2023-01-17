import { Card, CardContent, Grid, Typography,CardMedia, Button, Box, Switch} from '@mui/material'
import { Stack } from '@mui/system';
import React, { useReducer, useState ,useEffect,useRef} from 'react'
import { useQuery } from 'react-query'
import { getProduct } from '../services/products';
import {useFilter} from "./sidebar"
interface Product {
    product_name : string,
    price : number,
    product_image : string
}
export const Products = () => {
    const handleOption = (state : string)=>{
        if(state === "ASC"){
            return "DESC"
        }
        else{
            return "ASC"
        }
    }
    const {filter} = useFilter();
    const max = useRef<number>();
    const min = useRef<number>();
    const params = useRef("");
    const [checked,setChecked] = useState(false);
    const [param,setParam] = useReducer(handleOption,"ASC")
    const {data,isLoading,refetch} = useQuery(["products",params,min,max],()=>getProduct({sort : params.current,min : min.current,max : max.current}));
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        setChecked(event.target.checked);
        setParam();
        refetch();
    }
    useEffect(()=>{params.current = param},[param]);
    useEffect(()=>{min.current = filter.min;max.current = filter.max;refetch()},[filter])
    function getCard(product : Product,index : any): any {
        const {product_image,product_name,price} = product;
        return (
            <Grid item xs={4}>
            <Card key={index} sx={{width : 200}}>
                <CardMedia style={{height:180}} image={product_image} />
                <CardContent>
                    <Typography variant='h6'>
                        {product_name}
                    </Typography>
                    <Typography variant='body1'>
                        {price}
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
    <Box>
        <Stack direction="row" spacing={0.2} align-items="centre" marginTop={10} marginLeft={35}>
        <Typography>ASC</Typography>
        <Switch checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}/>
        <Typography>DESC</Typography>
        </Stack>
        <Grid container spacing={5} sx={{marginLeft : 30,marginTop : 0.1 , width : 1000}} >
        {data && data.data.map(getCard)}
        </Grid>
    </Box>
  )

}
