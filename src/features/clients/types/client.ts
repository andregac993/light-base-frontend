export interface Client {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  carPlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateClientDTO = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateClientDTO = Partial<CreateClientDTO>;

export interface ClientFilters {
  search?: string;
  page?: number;
  limit?: number;
}
