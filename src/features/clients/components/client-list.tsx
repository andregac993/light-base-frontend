'use client';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { EmptyState, LoadingState } from '@/components/patterns';

import { ClientCard } from './client-card';

import type { Client } from '../types';
import type { ReactNode } from 'react';

interface ClientListProps {
  clients: Client[];
  loading?: boolean;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  onClick?: (client: Client) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

export function ClientList({
  clients,
  loading = false,
  onEdit,
  onDelete,
  onClick,
  emptyTitle = 'Nenhum cliente encontrado',
  emptyDescription = 'Cadastre um novo cliente para começar.',
  emptyAction,
}: ClientListProps) {
  if (loading) {
    return <LoadingState message="Carregando clientes..." />;
  }

  if (clients.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={<PeopleOutlineIcon aria-hidden="true" />}
        action={emptyAction}
        testId="client-list-empty"
      />
    );
  }

  return (
    <Box
      component="section"
      role="list"
      aria-label={`Lista de clientes, ${clients.length} ${clients.length === 1 ? 'cliente' : 'clientes'}`}
      aria-live="polite"
      data-testid="client-list"
    >
      <Grid container spacing={2}>
        {clients.map((client) => (
          <Grid key={client.id} size={{ xs: 12, sm: 6, md: 4 }} role="listitem">
            <ClientCard client={client} onClick={onClick} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
