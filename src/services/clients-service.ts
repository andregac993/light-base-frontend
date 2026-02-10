import { mapToDatabase } from './client-mapper';
import { db } from './database';
import { DuplicateError, NotFoundError } from './errors';

import type { CreateClientDTO, UpdateClientDTO } from '@/features/clients';

export const clientsService = {
  async create(data: CreateClientDTO): Promise<string> {
    const existing = await db.clients.where('cpf').equals(data.cpf).first();
    if (existing) {
      throw new DuplicateError('CPF', data.cpf);
    }

    const id = crypto.randomUUID();
    const now = new Date();

    await db.clients.add({
      ...mapToDatabase(data),
      id,
      created_at: now,
      updated_at: now,
    });

    return id;
  },

  async update(id: string, data: UpdateClientDTO): Promise<void> {
    const existing = await db.clients.get(id);
    if (!existing) {
      throw new NotFoundError('Cliente', id);
    }

    if (data.cpf && data.cpf !== existing.cpf) {
      const cpfExists = await db.clients.where('cpf').equals(data.cpf).first();
      if (cpfExists) {
        throw new DuplicateError('CPF', data.cpf);
      }
    }

    await db.clients.update(id, {
      ...mapToDatabase({ ...existing, ...data } as CreateClientDTO),
      updated_at: new Date(),
    });
  },

  async remove(id: string): Promise<void> {
    const existing = await db.clients.get(id);
    if (!existing) {
      throw new NotFoundError('Cliente', id);
    }

    await db.clients.delete(id);
  },
};
