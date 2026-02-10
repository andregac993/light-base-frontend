'use client';

import { clientsService } from '@/services';

import type { CreateClientDTO, UpdateClientDTO } from '../types';

export function useClientActions() {
  return {
    create: (data: CreateClientDTO) => clientsService.create(data),
    update: (id: string, data: UpdateClientDTO) => clientsService.update(id, data),
    remove: (id: string) => clientsService.remove(id),
  };
}
