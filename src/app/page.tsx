import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
        }}
      >
        <Typography variant="h3" component="h1">
          Gerenciamento de Clientes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistema de controle de clientes e placas de veículos
        </Typography>
        <Button variant="contained" size="large">
          Acessar Sistema
        </Button>
      </Box>
    </Container>
  );
}
