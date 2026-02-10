'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  onBack?: () => void;
  testId?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  onBack,
  testId = 'page-header',
}: PageHeaderProps) {
  return (
    <Box
      component="header"
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {onBack && (
          <Tooltip title="Voltar">
            <IconButton
              onClick={onBack}
              aria-label="Voltar à página anterior"
              edge="start"
              data-testid={`${testId}-back-button`}
            >
              <ArrowBackIcon aria-hidden="true" />
            </IconButton>
          </Tooltip>
        )}

        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} data-testid={`${testId}-title`}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
              data-testid={`${testId}-subtitle`}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {children && (
        <Stack
          direction="row"
          spacing={1}
          flexShrink={0}
          role="group"
          aria-label="Ações da página"
          data-testid={`${testId}-actions`}
        >
          {children}
        </Stack>
      )}
    </Box>
  );
}
