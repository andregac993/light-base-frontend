import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test-utils';

import { ErrorFallback } from '../error-fallback';

describe('ErrorFallback', () => {
  const mockReset = vi.fn();
  const defaultProps = {
    error: new Error('Test error'),
    resetErrorBoundary: mockReset,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar mensagem de erro', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText(/Ocorreu um erro inesperado/)).toBeInTheDocument();
  });

  it('deve renderizar botão de tentar novamente', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByTestId('error-fallback-reset-button')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  it('deve chamar resetErrorBoundary ao clicar no botão', async () => {
    const user = userEvent.setup();
    render(<ErrorFallback {...defaultProps} />);

    await user.click(screen.getByTestId('error-fallback-reset-button'));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('deve ter role="alert" para acessibilidade', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
