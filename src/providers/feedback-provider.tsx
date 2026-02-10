'use client';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useCallback, useContext, useState } from 'react';

import type { AlertColor } from '@mui/material/Alert';
import type { ReactNode } from 'react';

interface FeedbackOptions {
  message: string;
  severity?: AlertColor;
}

interface FeedbackContextValue {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showFeedback: (options: FeedbackOptions) => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

interface FeedbackState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FeedbackState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showFeedback = useCallback(({ message, severity = 'info' }: FeedbackOptions) => {
    setState({ open: true, message, severity });
  }, []);

  const showError = useCallback(
    (message: string) => {
      showFeedback({ message, severity: 'error' });
    },
    [showFeedback]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showFeedback({ message, severity: 'success' });
    },
    [showFeedback]
  );

  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <FeedbackContext.Provider value={{ showError, showSuccess, showFeedback }}>
      {children}

      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={state.severity} onClose={handleClose} data-testid="feedback-alert">
          {state.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within FeedbackProvider');
  }
  return context;
}
