export class NotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} não encontrado: ${id}`);
    this.name = 'NotFoundError';
  }
}
