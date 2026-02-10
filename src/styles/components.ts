import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: theme.shape.borderRadius,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }),
      sizeLarge: {
        padding: '12px 24px',
        fontSize: '1rem',
      },
      sizeMedium: {
        padding: '8px 16px',
      },
      sizeSmall: {
        padding: '4px 12px',
        fontSize: '0.875rem',
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
        },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          fontWeight: 500,
        },
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 4,
        marginLeft: 0,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) * 2,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiCardActionArea: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: '12px 16px',
      },
      head: ({ theme }) => ({
        fontWeight: 600,
        backgroundColor: theme.palette.background.default,
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) * 2,
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.25rem',
        fontWeight: 600,
        padding: '16px 24px',
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '16px 24px',
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '12px 24px 16px',
        gap: 8,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
          borderRadius: 2,
        },
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },

  MuiSnackbar: {
    defaultProps: {
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
  },

  MuiCircularProgress: {
    defaultProps: {
      color: 'primary',
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
      enterDelay: 300,
      leaveDelay: 100,
    },
    styleOverrides: {
      tooltip: {
        fontSize: '0.75rem',
      },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
      }),
    },
  },

  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },
};
