'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db, mapFromDatabase } from '@/services';

import type { Client } from '@/types';

export function useClientById(id: string | null): { client: Client | null; loading: boolean } {
  const clientModel = useLiveQuery(async () => {
    if (!id) return null;
    return db.clients.get(id);
  }, [id]);

  const client = clientModel ? mapFromDatabase(clientModel) : null;
  const loading = clientModel === undefined;

  return { client, loading };
}
