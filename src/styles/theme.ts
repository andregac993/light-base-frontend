'use client';
import { createTheme } from '@mui/material/styles';

import { components } from './components';
import { palette } from './palette';
import { typography } from './typography';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  components,
});

export default theme;
