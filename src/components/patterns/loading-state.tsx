'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoadingStateProps {
  message?: string;
  size?: number;
  minHeight?: string | number;
  testId?: string;
}

export function LoadingState({
  message = 'Carregando...',
  size = 40,
  minHeight = 200,
  testId = 'loading-state',
}: LoadingStateProps) {
  return (
    <Box
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={message}
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight,
      }}
    >
      <CircularProgress size={size} aria-hidden="true" />
      {message && (
        <Typography variant="body2" color="text.secondary" data-testid={`${testId}-message`}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
