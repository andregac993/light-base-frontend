'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { ReactNode } from 'react';

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  testId?: string;
}

export function InfoItem({ icon, label, value, testId }: InfoItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ color: 'action.active', mt: 0.5 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" data-testid={testId}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}
