import { z } from 'zod';

import { isValidCarPlate, isValidCPF, isValidPhone } from '@/helpers';

export const clientSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  cpf: z.string().refine(isValidCPF, 'CPF inválido'),
  phone: z.string().refine(isValidPhone, 'Telefone inválido'),
  carPlate: z.string().refine(isValidCarPlate, 'Placa inválida (use formato ABC1234 ou ABC1D23)'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
