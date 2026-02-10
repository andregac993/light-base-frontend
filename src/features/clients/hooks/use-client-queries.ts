'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db, mapFromDatabase } from '@/services';

import type { Client } from '../types';

interface ClientQueryResult {
  client: Client | null;
  loading: boolean;
}

interface ClientListResult {
  clients: Client[];
  loading: boolean;
}

export function useClientById(id: string | null): ClientQueryResult {
  const data = useLiveQuery(() => (id ? db.clients.get(id) : undefined), [id]);

  return {
    client: data ? mapFromDatabase(data) : null,
    loading: id !== null && data === undefined,
  };
}

export function useClientSearch(query: string): ClientListResult {
  const data = useLiveQuery(() => {
    if (!query.trim()) {
      return db.clients.orderBy('name').toArray();
    }

    const term = query.toLowerCase().trim();

    return db.clients
      .filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.cpf.includes(term) ||
          c.phone.includes(term) ||
          c.car_plate.toLowerCase().includes(term)
      )
      .toArray();
  }, [query]);

  return {
    clients: data?.map(mapFromDatabase) ?? [],
    loading: data === undefined,
  };
}
