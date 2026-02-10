'use client';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PageHeader } from '@/components/layout';
import { SearchField } from '@/components/ui';
import { ROUTES } from '@/constants';
import { ClientList, useClientActions, useClientSearch } from '@/features/clients';
import { useErrorHandler } from '@/hooks/common';
import { useConfirm, useFeedback } from '@/providers';

import type { Client } from '@/features/clients';

export default function ClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { clients, loading } = useClientSearch(searchQuery);
  const { remove } = useClientActions();
  const { confirm } = useConfirm();
  const { showError } = useFeedback();
  const { getErrorMessage } = useErrorHandler();

  const goToNewClient = () => router.push(ROUTES.CLIENTS.NEW);
  const goToDetails = (client: Client) => router.push(ROUTES.CLIENTS.DETAILS(client.id));
  const goToEdit = (client: Client) => router.push(ROUTES.CLIENTS.EDIT(client.id));

  const handleDelete = async (client: Client) => {
    const confirmed = await confirm({
      title: 'Excluir cliente',
      message: `Tem certeza que deseja excluir o cliente "${client.name}"? Esta ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        await remove(client.id);
      } catch (err) {
        showError(getErrorMessage(err));
      }
    }
  };

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Gerencie os clientes e suas placas de veículos"
        testId="clients-page-header"
      >
        <Button
          variant="contained"
          startIcon={<AddIcon aria-hidden="true" />}
          onClick={goToNewClient}
          data-testid="new-client-button"
        >
          Novo Cliente
        </Button>
      </PageHeader>

      <Stack spacing={3}>
        <SearchField
          onSearch={setSearchQuery}
          placeholder="Buscar por nome, CPF, telefone ou placa..."
          fullWidth
          label="Buscar clientes"
        />

        <ClientList
          clients={clients}
          loading={loading}
          onClick={goToDetails}
          onEdit={goToEdit}
          onDelete={handleDelete}
          emptyAction={
            !searchQuery ? (
              <Button
                variant="contained"
                startIcon={<AddIcon aria-hidden="true" />}
                onClick={goToNewClient}
                data-testid="empty-state-new-client-button"
              >
                Cadastrar Primeiro Cliente
              </Button>
            ) : undefined
          }
          emptyTitle={
            searchQuery ? 'Nenhum cliente encontrado para esta busca' : 'Nenhum cliente cadastrado'
          }
          emptyDescription={
            searchQuery
              ? 'Tente buscar por outro termo ou limpe o filtro.'
              : 'Cadastre seu primeiro cliente para começar.'
          }
        />
      </Stack>
    </>
  );
}
