import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        '&:focus-visible': {
          outline: '2px solid #1976d2',
          outlineOffset: 2,
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
    },
  },
};
