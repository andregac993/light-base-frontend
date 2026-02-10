'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import theme from '@/styles/theme';

import { ConfirmProvider } from './confirm-provider';
import { FeedbackProvider } from './feedback-provider';

import type { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <FeedbackProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </FeedbackProvider>
    </MuiThemeProvider>
  );
}
