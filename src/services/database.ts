import Dexie from 'dexie';

import type { Table } from 'dexie';

export interface ClientModel {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  car_plate: string;
  created_at: Date;
  updated_at: Date;
}

class ClientsDatabase extends Dexie {
  clients!: Table<ClientModel, string>;

  constructor() {
    super('light_clients_db');

    this.version(1).stores({
      clients: 'id, name, cpf, phone, car_plate, created_at, updated_at',
    });
  }
}

export const db = new ClientsDatabase();
