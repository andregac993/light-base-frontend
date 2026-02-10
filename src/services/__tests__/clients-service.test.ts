import { beforeEach, describe, expect, it } from 'vitest';

import { clientsService } from '../clients-service';
import { db } from '../database';
import { DuplicateError, NotFoundError } from '../errors';

const mockClient = {
  name: 'João Silva',
  cpf: '123.456.789-00',
  phone: '(11) 99999-9999',
  carPlate: 'ABC12345',
};

describe('clientsService', () => {
  beforeEach(async () => {
    await db.clients.clear();
  });

  describe('create', () => {
    it('deve criar um cliente com sucesso', async () => {
      const id = await clientsService.create(mockClient);

      expect(id).toBeDefined();
      expect(typeof id).toBe('string');

      const saved = await db.clients.get(id);
      expect(saved).toBeDefined();
      expect(saved?.name).toBe(mockClient.name);
      expect(saved?.cpf).toBe(mockClient.cpf);
    });

    it('deve lançar erro ao criar cliente com CPF duplicado', async () => {
      await clientsService.create(mockClient);

      await expect(clientsService.create(mockClient)).rejects.toThrow(DuplicateError);
      await expect(clientsService.create(mockClient)).rejects.toThrow('CPF já cadastrado');
    });

    it('deve permitir criar clientes com CPFs diferentes', async () => {
      const id1 = await clientsService.create(mockClient);
      const id2 = await clientsService.create({
        ...mockClient,
        cpf: '987.654.321-00',
      });

      expect(id1).not.toBe(id2);
    });
  });

  describe('update', () => {
    it('deve atualizar um cliente existente', async () => {
      const id = await clientsService.create(mockClient);

      await clientsService.update(id, { name: 'João Silva Atualizado' });

      const updated = await db.clients.get(id);
      expect(updated?.name).toBe('João Silva Atualizado');
    });

    it('deve lançar erro ao atualizar cliente inexistente', async () => {
      await expect(clientsService.update('id-inexistente', { name: 'Teste' })).rejects.toThrow(
        NotFoundError
      );
    });

    it('deve lançar erro ao atualizar CPF para um já existente', async () => {
      const id1 = await clientsService.create(mockClient);
      await clientsService.create({
        ...mockClient,
        cpf: '987.654.321-00',
      });

      await expect(clientsService.update(id1, { cpf: '987.654.321-00' })).rejects.toThrow(
        DuplicateError
      );
    });

    it('deve permitir manter o mesmo CPF na atualização', async () => {
      const id = await clientsService.create(mockClient);

      await expect(
        clientsService.update(id, { name: 'Novo Nome', cpf: mockClient.cpf })
      ).resolves.not.toThrow();
    });
  });

  describe('remove', () => {
    it('deve remover um cliente existente', async () => {
      const id = await clientsService.create(mockClient);

      await clientsService.remove(id);

      const removed = await db.clients.get(id);
      expect(removed).toBeUndefined();
    });

    it('deve lançar erro ao remover cliente inexistente', async () => {
      await expect(clientsService.remove('id-inexistente')).rejects.toThrow(NotFoundError);
    });
  });
});
