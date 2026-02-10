'use client';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout';
import { LoadingState } from '@/components/patterns';
import { InfoItem } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useClientActions, useClientById } from '@/features/clients';
import { useErrorHandler } from '@/hooks/common';
import { useConfirm, useFeedback } from '@/providers';

export default function ClientDetailsPage() {
  const router = useRouter();
  const { id: clientId } = useParams<{ id: string }>();

  const { client, loading } = useClientById(clientId);
  const { remove } = useClientActions();
  const { confirm } = useConfirm();
  const { showError } = useFeedback();
  const { getErrorMessage } = useErrorHandler();

  const goToList = () => router.push(ROUTES.CLIENTS.LIST);
  const goToEdit = () => router.push(ROUTES.CLIENTS.EDIT(clientId));

  const handleDelete = async () => {
    if (!client) return;

    const confirmed = await confirm({
      title: 'Excluir cliente',
      message: `Tem certeza que deseja excluir o cliente "${client.name}"? Esta ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        await remove(clientId);
        router.push(ROUTES.CLIENTS.LIST);
      } catch (err) {
        showError(getErrorMessage(err));
      }
    }
  };

  if (loading) {
    return (
      <Box data-testid="client-details-page-loading">
        <PageHeader
          title="Detalhes do Cliente"
          subtitle="Carregando..."
          onBack={goToList}
          testId="client-details-page-header"
        />
        <LoadingState message="Carregando dados do cliente..." testId="client-details-loading" />
      </Box>
    );
  }

  if (!client) {
    return (
      <Box data-testid="client-details-page-not-found">
        <PageHeader
          title="Cliente não encontrado"
          subtitle="O cliente solicitado não existe ou foi removido"
          onBack={goToList}
          testId="client-details-page-header"
        />
        <Alert severity="warning" data-testid="client-not-found-alert">
          Não foi possível encontrar o cliente. Ele pode ter sido removido.
        </Alert>
      </Box>
    );
  }

  return (
    <Box data-testid="client-details-page">
      <PageHeader
        title={client.name}
        subtitle="Informações do cliente"
        onBack={goToList}
        testId="client-details-page-header"
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={goToEdit}
            data-testid="client-details-edit-button"
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleDelete}
            data-testid="client-details-delete-button"
          >
            Excluir
          </Button>
        </Stack>
      </PageHeader>

      <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'center' } }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 640,
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ mb: 3 }}>
              DADOS PESSOAIS
            </Typography>

            <Stack spacing={3}>
              <InfoItem
                icon={<PersonOutlineIcon />}
                label="Nome completo"
                value={client.name}
                testId="client-details-name"
              />
              <InfoItem
                icon={<BadgeOutlinedIcon />}
                label="CPF"
                value={client.cpf}
                testId="client-details-cpf"
              />
              <InfoItem
                icon={<PhoneOutlinedIcon />}
                label="Telefone"
                value={client.phone}
                testId="client-details-phone"
              />
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ mb: 3 }}>
              VEÍCULO
            </Typography>

            <InfoItem
              icon={<DirectionsCarOutlinedIcon />}
              label="Placa do veículo"
              value={client.carPlate}
              testId="client-details-car-plate"
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
