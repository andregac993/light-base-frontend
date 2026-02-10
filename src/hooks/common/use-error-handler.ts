'use client';

import { useCallback } from 'react';

import { DuplicateError, NotFoundError } from '@/services';

const DEFAULT_MESSAGES: Record<string, string> = {
  NotFoundError: 'Registro não encontrado.',
  DuplicateError: 'Este registro já existe.',
  ConstraintError: 'Dados duplicados.',
  QuotaExceededError: 'Armazenamento local cheio. Libere espaço.',
  default: 'Ocorreu um erro inesperado. Tente novamente.',
};

export function useErrorHandler() {
  const getErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof NotFoundError) {
      return error.message;
    }

    if (error instanceof DuplicateError) {
      return error.message;
    }

    if (error instanceof Error) {
      if (error.name in DEFAULT_MESSAGES) {
        return DEFAULT_MESSAGES[error.name];
      }
    }

    return DEFAULT_MESSAGES.default;
  }, []);

  return { getErrorMessage };
}
