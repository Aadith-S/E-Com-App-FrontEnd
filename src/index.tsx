import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { Profile } from './components/profile';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Products } from './components/products';
import { QueryClient, QueryClientProvider} from 'react-query'
import { AddProduct } from './components/addProduct';

const queryClient = new QueryClient()

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
            path : "",
            element : <Products/>
          }
      ]
      },
      {
        path : "profile",
        element : <Profile/>
      },
      {
        path : "addProduct",
        element : <AddProduct/>
      }
    ]
  }
]);
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    white : true;
    yellow : true;
    black : true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    white: Palette['primary'];
    yellow: Palette['primary'];
    black: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
    yellow: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
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
    },
    yellow : {
      main : "#ffff00",
      contrastText: '#fff',
    },
   black : {
    main : "#000000",
    contrastText: '#fff',
   }
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
  <ThemeProvider theme={theme}>
  <RouterProvider router={router}/>
  </ThemeProvider>
  </QueryClientProvider>
);
reportWebVitals();
