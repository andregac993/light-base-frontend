'use client';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { ROUTES } from '@/constants';

import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
}

export function AppLayout({ children, maxWidth = 'lg' }: AppLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'grey.50',
      }}
      data-testid="app-layout"
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
        data-testid="app-header"
      >
        <Container maxWidth={maxWidth}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
            <Link
              href={ROUTES.CLIENTS.LIST}
              style={{ textDecoration: 'none', color: 'inherit' }}
              aria-label="Ir para lista de clientes"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{
                  '&:hover': { opacity: 0.8 },
                  transition: 'opacity 0.2s',
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <DirectionsCarIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.2,
                      display: 'block',
                    }}
                    data-testid="app-title"
                  >
                    ClienteCar
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: { xs: 'none', sm: 'block' },
                      lineHeight: 1,
                    }}
                  >
                    Gestão de Clientes
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        component="main"
        maxWidth={maxWidth}
        sx={{
          flex: 1,
          py: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
        }}
        data-testid="app-main-content"
      >
        {children}
      </Container>
    </Box>
  );
}
