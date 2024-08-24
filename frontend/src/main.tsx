import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StrictMode } from 'react';
import theme from './theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer position="bottom-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
