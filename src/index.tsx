import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { Profile } from './components/profile';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Products } from './components/products';
const router = createBrowserRouter([
  {
    path : "/",
    element :<App/>,
    children : [
      {
        path : "home",
        element : <Sidebar/>,
        children : [
          {
            path : "products",
            element : <Products/>
          }
      ]
      },
      {
        path : "profile",
        element : <Profile/>
      }
    ]
  }
]);
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    white : true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}
const theme = createTheme({
  palette: 
  {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    white : {
      main: '#ffffff',
      contrastText: '#fff',
    }
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <ThemeProvider theme={theme}>
  <RouterProvider router={router}/>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
