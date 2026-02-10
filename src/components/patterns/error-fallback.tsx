'use client';

import ReplayIcon from '@mui/icons-material/Replay';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      role="alert"
      data-testid="error-fallback"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ mb: 2, color: 'warning.main' }} aria-hidden="true">
        <WarningAmberIcon sx={{ fontSize: 64 }} />
      </Box>

      <Typography variant="h6" component="p" gutterBottom>
        Algo deu errado
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        Ocorreu um erro inesperado. Tente recarregar a página.
      </Typography>

      <Button
        variant="outlined"
        startIcon={<ReplayIcon />}
        onClick={resetErrorBoundary}
        data-testid="error-fallback-reset-button"
      >
        Tentar novamente
      </Button>
    </Box>
  );
}
