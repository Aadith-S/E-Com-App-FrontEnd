import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Link, Outlet } from 'react-router-dom';
import { Stack } from '@mui/system';
const drawerWidth = 240
export const Sidebar = () => {
  const listelement = [{ text : "Filter1"}]
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
            {listelement.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                    <ListItemText>{item.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Outlet/>
    </Stack>
  )
}