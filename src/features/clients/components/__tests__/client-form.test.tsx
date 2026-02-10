import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '@/test-utils';

import { ClientForm } from '../client-form';

const mockOnSubmit = vi.fn();
const mockOnCancel = vi.fn();

const validInput = {
  name: 'João Silva',
  cpf: '529.982.247-25',
  phone: '(11) 99999-9999',
  carPlate: 'ABC1234',
};

const expectedOutput = {
  name: 'João Silva',
  cpf: '52998224725',
  phone: '11999999999',
  carPlate: 'ABC1234',
};

describe('ClientForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('renderização', () => {
    it('deve renderizar todos os campos do formulário', () => {
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByTestId('client-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('client-cpf-input')).toBeInTheDocument();
      expect(screen.getByTestId('client-phone-input')).toBeInTheDocument();
      expect(screen.getByTestId('client-car-plate-input')).toBeInTheDocument();
    });

    it('deve renderizar botões de submit e cancelar', () => {
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByTestId('client-form-submit-button')).toBeInTheDocument();
      expect(screen.getByTestId('client-form-cancel-button')).toBeInTheDocument();
    });

    it('deve exibir "Cadastrar Cliente" no botão quando criando', () => {
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByTestId('client-form-submit-button')).toHaveTextContent(
        'Cadastrar Cliente'
      );
    });

    it('deve exibir "Salvar Alterações" no botão quando editando', () => {
      const client = {
        id: '1',
        ...expectedOutput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      render(<ClientForm defaultValues={client} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByTestId('client-form-submit-button')).toHaveTextContent(
        'Salvar Alterações'
      );
    });
  });

  describe('validação', () => {
    it('deve exibir erro quando nome é muito curto', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.type(screen.getByTestId('client-name-input'), 'Jo');
      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(screen.getByText('Nome deve ter no mínimo 3 caracteres')).toBeInTheDocument();
      });
    });

    it('deve exibir erro quando CPF é inválido', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.type(screen.getByTestId('client-name-input'), 'João Silva');
      await user.type(screen.getByTestId('client-cpf-input'), '111.111.111-11');
      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(screen.getByText('CPF inválido')).toBeInTheDocument();
      });
    });

    it('deve exibir erro quando telefone é inválido', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.type(screen.getByTestId('client-name-input'), 'João Silva');
      await user.type(screen.getByTestId('client-cpf-input'), '529.982.247-25');
      await user.type(screen.getByTestId('client-phone-input'), '1199999');
      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(screen.getByText('Telefone inválido')).toBeInTheDocument();
      });
    });

    it('deve exibir erro quando placa é inválida', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.type(screen.getByTestId('client-name-input'), 'João Silva');
      await user.type(screen.getByTestId('client-cpf-input'), '529.982.247-25');
      await user.type(screen.getByTestId('client-phone-input'), '(11) 99999-9999');
      await user.type(screen.getByTestId('client-car-plate-input'), 'INVALIDA');
      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(
          screen.getByText('Placa inválida (use formato ABC1234 ou ABC1D23)')
        ).toBeInTheDocument();
      });
    });
  });

  describe('submit', () => {
    it('deve chamar onSubmit com dados válidos', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.type(screen.getByTestId('client-name-input'), validInput.name);
      await user.type(screen.getByTestId('client-cpf-input'), validInput.cpf);
      await user.type(screen.getByTestId('client-phone-input'), validInput.phone);
      await user.type(screen.getByTestId('client-car-plate-input'), validInput.carPlate);

      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining(expectedOutput),
          expect.anything()
        );
      });
    });

    it('não deve chamar onSubmit com dados inválidos', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.click(screen.getByTestId('client-form-submit-button'));

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe('cancelar', () => {
    it('deve chamar onCancel ao clicar no botão cancelar', async () => {
      const user = userEvent.setup();
      render(<ClientForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      await user.click(screen.getByTestId('client-form-cancel-button'));

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
