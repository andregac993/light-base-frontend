'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/patterns';
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FeedbackProvider>
          <ConfirmProvider>{children}</ConfirmProvider>
        </FeedbackProvider>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}
