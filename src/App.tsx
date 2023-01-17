import './App.css';
import { Stack } from '@mui/material';
import { Navbar } from './components/navbar';
import { Outlet } from 'react-router-dom';  


function App() {
  return (
   <Stack>
    <Navbar/>
    <Outlet/>
   </Stack>
  );
}

export default App;
