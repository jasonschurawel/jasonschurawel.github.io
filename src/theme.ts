import { createTheme } from '@mui/material/styles';

// Material Design 3 inspired theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A8C8EC', // Soft pastel blue
      light: '#C5D6F0',
      dark: '#7FB3E3',
      contrastText: '#2C3E50',
    },
    secondary: {
      main: '#E8B4CB', // Soft pastel pink
      light: '#F0C8D4',
      dark: '#D18FB0',
      contrastText: '#2C3E50',
    },
    error: {
      main: '#F8B4B4',
      light: '#FBD2D2',
      dark: '#E68989',
      contrastText: '#2C3E50',
    },
    warning: {
      main: '#F5D896',
      light: '#F8E3B3',
      dark: '#F1CC79',
      contrastText: '#2C3E50',
    },
    info: {
      main: '#B4E5F8',
      light: '#D2EFFC',
      dark: '#89D3F4',
      contrastText: '#2C3E50',
    },
    success: {
      main: '#C8E6C9', // Soft pastel green
      light: '#D7EDD8',
      dark: '#A5D6A7',
      contrastText: '#2C3E50',
    },
    background: {
      default: '#FDFCFC', // Very soft off-white
      paper: '#F8F9FA', // Slightly warmer white
    },
    text: {
      primary: '#2C3E50', // Soft dark blue-gray
      secondary: '#5A6C7D', // Medium blue-gray
      disabled: '#A5B3C1',
    },
    divider: 'rgba(200, 230, 201, 0.3)', // Very light pastel green divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
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
      textTransform: 'none' as const,
    },
  },
  shape: {
    borderRadius: 12, // Material Design 3 rounded corners
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
          transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Pill-shaped buttons
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

// Create a dark theme variant
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D0BCFF', // Material Design 3 Primary Dark
      light: '#4F378B',
      dark: '#EADDFF',
      contrastText: '#371E73',
    },
    secondary: {
      main: '#CCC2DC', // Material Design 3 Secondary Dark
      light: '#4A4458',
      dark: '#E8DEF8',
      contrastText: '#332D41',
    },
    error: {
      main: '#FFB4AB',
      light: '#690005',
      dark: '#FFDAD6',
      contrastText: '#93000A',
    },
    warning: {
      main: '#FFB951',
      light: '#633B00',
      dark: '#FFDBCF',
      contrastText: '#2E1500',
    },
    info: {
      main: '#4DD0E1',
      light: '#004F50',
      dark: '#9CF0F0',
      contrastText: '#002020',
    },
    success: {
      main: '#69F0AE',
      light: '#0A5D2F',
      dark: '#B7F2C2',
      contrastText: '#002204',
    },
    background: {
      default: '#10090F', // Material Design 3 Surface Dark
      paper: '#1D1B20', // Material Design 3 Surface Container Dark
    },
    text: {
      primary: '#E6E1E5',
      secondary: '#CAC4D0',
      disabled: '#938F99',
    },
    divider: '#938F99',
  },
  typography: theme.typography,
  shape: theme.shape,
  components: theme.components,
});

export { darkTheme };
export default theme;
