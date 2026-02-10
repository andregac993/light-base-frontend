import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import { ClientForm } from '@/features/clients/components/client-form';
import { ClientList } from '@/features/clients/components/client-list';
import { useClientActions, useClientSearch } from '@/features/clients/hooks';
import { db } from '@/services';
import { render, screen, waitFor } from '@/test-utils';

const validClient = {
  name: 'Maria Silva',
  cpf: '529.982.247-25',
  phone: '(11) 98765-4321',
  carPlate: 'XYZ9876',
};

function TestClientList() {
  const { clients, loading } = useClientSearch('');
  return <ClientList clients={clients} loading={loading} />;
}

function TestCreateFlow({ onSuccess }: { onSuccess: () => void }) {
  const { create } = useClientActions();

  const handleSubmit = async (data: Parameters<typeof create>[0]) => {
    await create(data);
    onSuccess();
  };

  return <ClientForm onSubmit={handleSubmit} onCancel={() => {}} />;
}

describe('Fluxo de Clientes - Integração', () => {
  beforeEach(async () => {
    await db.clients.clear();
  });

  it('deve criar um cliente e exibi-lo na lista', async () => {
    const user = userEvent.setup();
    let clientCreated = false;

    const { rerender } = render(<TestCreateFlow onSuccess={() => (clientCreated = true)} />);

    await user.type(screen.getByTestId('client-name-input'), validClient.name);
    await user.type(screen.getByTestId('client-cpf-input'), validClient.cpf);
    await user.type(screen.getByTestId('client-phone-input'), validClient.phone);
    await user.type(screen.getByTestId('client-car-plate-input'), validClient.carPlate);

    await user.click(screen.getByTestId('client-form-submit-button'));

    await waitFor(() => {
      expect(clientCreated).toBe(true);
    });

    rerender(<TestClientList />);

    await waitFor(() => {
      expect(screen.getByText(validClient.name)).toBeInTheDocument();
    });
  });
});
