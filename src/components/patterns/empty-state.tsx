'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  testId?: string;
}
export function EmptyState({
  title,
  description,
  icon,
  action,
  testId = 'empty-state',
}: EmptyStateProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      {icon && (
        <Box
          sx={{ mb: 2, color: 'text.secondary', '& > svg': { fontSize: 64 } }}
          aria-hidden="true"
        >
          {icon}
        </Box>
      )}

      <Typography variant="h6" component="p" gutterBottom data-testid={`${testId}-title`}>
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 400 }}
          data-testid={`${testId}-description`}
        >
          {description}
        </Typography>
      )}

      {action}
    </Box>
  );
}
