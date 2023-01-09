import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stack } from '@mui/material';
import { Navbar } from './components/navbar';
import { Outlet } from 'react-router-dom';  
import { Sidebar } from './components/sidebar';

function App() {
  return (
   <Stack>
    <Navbar/>
    <Outlet/>
   </Stack>
  );
}

export default App;
