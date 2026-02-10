'use client';
import { useLiveQuery } from 'dexie-react-hooks';

import { db, mapFromDatabase } from '@/services';

import type { Client } from '@/types';

interface UseClientByPlateEndingReturn {
  clients: Client[];
  loading: boolean;
}

export function useClientByPlateEnding(plateEnding: string): UseClientByPlateEndingReturn {
  const clientsModel = useLiveQuery(async () => {
    if (!plateEnding.trim()) {
      return [];
    }
    const allClients = await db.clients.toArray();
    return allClients.filter((client) => client.car_plate.endsWith(plateEnding.toUpperCase()));
  }, [plateEnding]);
  const clients = clientsModel?.map(mapFromDatabase) ?? [];
  const loading = clientsModel === undefined;
  return { clients, loading };
}
