export class DuplicateError extends Error {
  constructor(field: string, value: string) {
    super(`${field} já cadastrado: ${value}`);
    this.name = 'DuplicateError';
  }
}
