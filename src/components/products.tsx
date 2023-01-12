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
    console.log(filter);
    const max = useRef<number>();
    const min = useRef<number>();
    const params = useRef("");
    const [checked,setChecked] = useState(false);
    const [param,setParam] = useReducer(handleOption,"ASC")
    const {data,isLoading,refetch} = useQuery(["products",params,min,max],()=>getProduct({sort : params.current,min : min.current,max : max.current}) ,{onSuccess :()=>{
        console.log(data);
    }});
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
        setChecked(event.target.checked);
        console.log(checked);
        setParam();
        console.log(param);
        refetch();
    }
    useEffect(()=>{params.current = param},[param]);
    useEffect(()=>{min.current = filter.min;max.current = filter.max;refetch()},[filter])
    // const products : Product[] = [{product_name : "Some Name", price : 120,product_image :"https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&w=1000&q=80"},{product_name : "Another Name", price : 220,product_image : "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}]
    function getCard(product : Product,index : any): any {
        return (
            <Grid item xs={4}>
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
