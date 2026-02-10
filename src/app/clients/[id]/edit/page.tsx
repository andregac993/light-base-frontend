'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout';
import { LoadingState } from '@/components/patterns';
import { ROUTES } from '@/constants';
import { ClientForm, useClientActions, useClientById } from '@/features/clients';
import { useErrorHandler } from '@/hooks/common';
import { useFeedback } from '@/providers';

import type { ClientFormData } from '@/features/clients';

export default function EditClientPage() {
  const router = useRouter();
  const { id: clientId } = useParams<{ id: string }>();

  const { client, loading } = useClientById(clientId);
  const { update } = useClientActions();
  const { showError } = useFeedback();
  const { getErrorMessage } = useErrorHandler();

  const goToList = () => router.push(ROUTES.CLIENTS.LIST);

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await update(clientId, data);
      router.push(ROUTES.CLIENTS.LIST);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <Box data-testid="edit-client-page-loading">
        <PageHeader
          title="Editar Cliente"
          subtitle="Carregando dados..."
          onBack={goToList}
          testId="edit-client-page-header"
        />
        <LoadingState message="Carregando dados do cliente..." testId="edit-client-loading" />
      </Box>
    );
  }

  if (!client) {
    return (
      <Box data-testid="edit-client-page-not-found">
        <PageHeader
          title="Cliente não encontrado"
          subtitle="O cliente solicitado não existe ou foi removido"
          onBack={goToList}
          testId="edit-client-page-header"
        />
        <Alert severity="warning" data-testid="client-not-found-alert">
          Não foi possível encontrar o cliente. Ele pode ter sido removido.
        </Alert>
      </Box>
    );
  }

  return (
    <Box data-testid="edit-client-page">
      <PageHeader
        title="Editar Cliente"
        subtitle={`Editando dados de ${client.name}`}
        onBack={goToList}
        testId="edit-client-page-header"
      />

      <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'center' } }}>
        <Box sx={{ width: '100%', maxWidth: 640 }}>
          <ClientForm defaultValues={client} onSubmit={handleSubmit} onCancel={goToList} />
        </Box>
      </Box>
    </Box>
  );
}
