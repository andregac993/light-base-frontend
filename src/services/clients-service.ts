import { mapToDatabase } from './client-mapper';
import { db } from './database';

import type { CreateClientDTO, UpdateClientDTO } from '@/types';

export const clientsService = {
  async create(data: CreateClientDTO): Promise<string> {
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

  async update(id: string, data: UpdateClientDTO): Promise<boolean> {
    const existing = await db.clients.get(id);
    if (!existing) return false;

    const updateData: Record<string, unknown> = { updated_at: new Date() };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.cpf !== undefined) updateData.cpf = data.cpf;
    if (data.carPlate !== undefined) updateData.car_plate = data.carPlate;

    await db.clients.update(id, updateData);
    return true;
  },

  async delete(id: string): Promise<boolean> {
    const existing = await db.clients.get(id);
    if (!existing) return false;

    await db.clients.delete(id);
    return true;
  },
};
