import type { ClientModel } from './database';
import type { Client, CreateClientDTO } from '@/features/clients';

export function mapFromDatabase(model: ClientModel): Client {
  return {
    id: model.id,
    name: model.name,
    phone: model.phone,
    cpf: model.cpf,
    carPlate: model.car_plate,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
  };
}

export function mapToDatabase(
  dto: CreateClientDTO
): Omit<ClientModel, 'id' | 'created_at' | 'updated_at'> {
  return {
    name: dto.name,
    phone: dto.phone,
    cpf: dto.cpf,
    car_plate: dto.carPlate,
  };
}
