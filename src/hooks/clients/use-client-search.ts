'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db, mapFromDatabase } from '@/services';

import type { Client } from '@/types';

interface UseClientSearchReturn {
  clients: Client[];
  loading: boolean;
}

export function useClientSearch(query: string): UseClientSearchReturn {
  const clientsModel = useLiveQuery(async () => {
    if (!query.trim()) {
      return db.clients.orderBy('created_at').reverse().toArray();
    }

    const lowerQuery = query.toLowerCase().trim();
    const allClients = await db.clients.toArray();

    return allClients.filter(
      (client) =>
        client.name.toLowerCase().includes(lowerQuery) ||
        client.cpf.includes(query) ||
        client.car_plate.toLowerCase().includes(lowerQuery) ||
        client.phone.includes(query)
    );
  }, [query]);

  const clients = clientsModel?.map(mapFromDatabase) ?? [];
  const loading = clientsModel === undefined;

  return { clients, loading };
}
