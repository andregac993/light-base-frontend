'use client';

import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout';
import { ROUTES } from '@/constants';
import { ClientForm, useClientActions } from '@/features/clients';
import { useErrorHandler } from '@/hooks/common';
import { useFeedback } from '@/providers';

import type { ClientFormData } from '@/features/clients';

export default function NewClientPage() {
  const router = useRouter();
  const { create } = useClientActions();
  const { showError } = useFeedback();
  const { getErrorMessage } = useErrorHandler();

  const goToList = () => router.push(ROUTES.CLIENTS.LIST);

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await create(data);
      router.push(ROUTES.CLIENTS.LIST);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  return (
    <Box data-testid="new-client-page">
      <PageHeader
        title="Novo Cliente"
        subtitle="Cadastre um novo cliente no sistema"
        onBack={goToList}
        testId="new-client-page-header"
      />

      <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'center' } }}>
        <Box sx={{ width: '100%', maxWidth: 640 }}>
          <ClientForm onSubmit={handleSubmit} onCancel={goToList} />
        </Box>
      </Box>
    </Box>
  );
}
