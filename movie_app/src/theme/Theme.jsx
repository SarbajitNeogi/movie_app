import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // A darker shade of blue
    },
    secondary: {
      main: '#ff6f00', // A contrasting orange for secondary actions
    },
    background: {
      default: '#f5f5f5', // A light grey for background
    },
    text: {
      primary: '#212121', // Dark grey for primary text
      secondary: '#757575', // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0.01562em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01562em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.01562em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.7,
      letterSpacing: '0.01562em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default Theme;
