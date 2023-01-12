import {useRef, useState,useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Outlet,useOutletContext } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Alert, Button, TextField, Typography } from '@mui/material';
const drawerWidth = 240
interface FilterType{
    min ?: number,
    max ?: number
}
interface ContextType{
    filter : FilterType,
}
export function useFilter(){
    return useOutletContext<ContextType>()
}
export const Sidebar = () => {
    const [filter,setFilter] = useState<FilterType>({});
    const min = useRef<HTMLInputElement>(null);
    const max = useRef<HTMLInputElement>(null);
    const errorCheck = useRef<string>("");
    const [error,setError] = useState<string>("");
    console.log(filter);
    const validateFilter = ()=>{
        if(min.current && max.current)
        {
            if(isNaN(+min.current.value) && min.current.value.length > 0)
        {
            setError("Min is Invalid");
            return false;
        }
        else if(isNaN(+max.current.value) && max.current.value.length > 0){
            setError("Max is Invalid");
            return false;
        }
        else if(parseInt(min.current.value)> parseInt(max.current.value)){
            setError("Min Greater than Max");
            return false;
        }
        else{
            setError("")
            return true;
        }
        }
    }
    const handleFilter = ()=>{
        console.log(min);
        console.log(max);
        if(validateFilter()){
            setFilter(prev=>{return{...prev,min : min.current ? parseInt(min.current.value) : NaN}})
            setFilter(prev=>{return{...prev,max : max.current ? parseInt(max.current.value) : NaN}})
    }
    }
    useEffect(()=>{errorCheck.current = error},[error]);
    const handleClear = ()=>{
        if(min.current && max.current){
            min.current.value= "";
            max.current.value= "";
            setError("");
        }
        handleFilter();
    }
  return (
    <Stack>
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto'}}>
          <List>
              <ListItem>
                    <ListItemText>Input Filter Range</ListItemText>
              </ListItem>
          </List>
          <Stack direction="row">
            <TextField size='small' sx={{marginLeft:1}} inputRef={min} />
            <Typography sx={{mx:1,mt:1}}>To</Typography>
            <TextField size='small' sx={{marginRight:1}} inputRef={max} />
          </Stack>
          <Stack direction="row" sx={{marginLeft:1,mt:1}}>
          <Button variant='contained' sx={{width:100,marginLeft:1}} onClick={handleFilter}>Filter</Button>
          <Button variant='contained' sx={{width:100,marginLeft:1}} onClick={handleClear}>Clear</Button>
          </Stack>
          {error && <Alert severity='error'>{error}</Alert>}
        </Box>
      </Drawer>
      <Outlet context={{filter}} />
    </Stack>
  )
}