import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { ROUTES } from '@/constants';

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
      data-testid="home-page"
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
          }}
          data-testid="home-card"
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
            aria-hidden="true"
          >
            <PeopleIcon sx={{ fontSize: 40, color: 'primary.contrastText' }} />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            gutterBottom
            data-testid="home-title"
          >
            Gerenciamento de Clientes
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 360, mx: 'auto' }}
            data-testid="home-description"
          >
            Sistema de controle de clientes e suas respectivas placas de veículos. Cadastre, edite e
            gerencie todos os seus clientes em um só lugar.
          </Typography>

          <Link href={ROUTES.CLIENTS.LIST} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon aria-hidden="true" />}
              data-testid="home-access-button"
              sx={{ px: 4 }}
            >
              Acessar Sistema
            </Button>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}
