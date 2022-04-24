import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightThemeNoResponsive = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#1976D2',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },

  typography: {
    body1: {
      color: '#111111',
    },
    body2: {
      color: '#111111',
    },
    h1: {
      color: '#111111',
    },
    h2: {
      color: '#111111',
    },
    h3: {
      color: '#111111',
    },
    h4: {
      color: '#111111',
    },
    h5: {
      color: '#111111',
    },
    h6: {
      color: '#111111',
    },
  },
});

export const lightTheme = responsiveFontSizes(lightThemeNoResponsive);

// const darkThemeNoResponsive = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#111111',
//     },
//     secondary: {
//       main: '#3F61D7',
//     },
//   },
//   typography: {
//     body1: {
//       color: '#ffffff',
//     },
//     body2: {
//       color: '#ffffff',
//     },
//     h1: {
//       color: '#ffffff',
//     },
//     h2: {
//       color: '#ffffff',
//     },
//     h3: {
//       color: '#ffffff',
//     },
//     h4: {
//       color: '#ffffff',
//     },
//     h5: {
//       color: '#ffffff',
//     },
//     h6: {
//       color: '#ffffff',
//     },
//   },
// });

// export const darkTheme = responsiveFontSizes(darkThemeNoResponsive);
