'use client';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';

import { db, mapFromDatabase, clientsService } from '@/services';

import type { Client } from '@/types';

interface UseClientsReturn {
  clients: Client[];
  loading: boolean;
  create: typeof clientsService.create;
  update: typeof clientsService.update;
  remove: (id: string) => Promise<boolean>;
}

export function useClients(): UseClientsReturn {
  const clientsModel = useLiveQuery(() => db.clients.orderBy('created_at').reverse().toArray(), []);

  const clients = clientsModel?.map(mapFromDatabase) ?? [];
  const loading = clientsModel === undefined;

  const remove = useCallback(async (id: string): Promise<boolean> => {
    return clientsService.delete(id);
  }, []);

  return {
    clients,
    loading,
    create: clientsService.create,
    update: clientsService.update,
    remove,
  };
}
