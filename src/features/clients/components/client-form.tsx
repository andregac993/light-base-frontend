'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';

import { MaskedField } from '@/components/ui';

import { clientSchema } from '../schemas';

import type { ClientFormData } from '../schemas';
import type { Client } from '../types';

interface ClientFormProps {
  defaultValues?: Client;
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
}

export function ClientForm({ defaultValues, onSubmit, onCancel }: ClientFormProps) {
  const isEditing = !!defaultValues;

  const { control, handleSubmit, formState } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues ?? { name: '', cpf: '', phone: '', carPlate: '' },
  });

  const isLoading = formState.isSubmitting;

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-testid={isEditing ? 'client-edit-form' : 'client-create-form'}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ mb: 3 }}>
          DADOS PESSOAIS
        </Typography>

        <Stack spacing={3}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nome completo"
                placeholder="Digite o nome do cliente"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isLoading}
                autoFocus
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'data-testid': 'client-name-input' },
                }}
              />
            )}
          />

          <Controller
            name="cpf"
            control={control}
            render={({ field, fieldState }) => (
              <MaskedField
                {...field}
                mask="cpf"
                label="CPF"
                placeholder="000.000.000-00"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isLoading}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'data-testid': 'client-cpf-input' },
                }}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <MaskedField
                {...field}
                mask="phone"
                label="Telefone"
                placeholder="(00) 00000-0000"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isLoading}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { 'data-testid': 'client-phone-input' },
                }}
              />
            )}
          />
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ mb: 3 }}>
          VEÍCULO
        </Typography>

        <Controller
          name="carPlate"
          control={control}
          render={({ field, fieldState }) => (
            <MaskedField
              {...field}
              mask="carPlate"
              label="Placa do veículo"
              placeholder="ABC1234 ou ABC1D23"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || 'Formatos: ABC1234 ou ABC1D23'}
              disabled={isLoading}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsCarOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  'data-testid': 'client-car-plate-input',
                  style: { textTransform: 'uppercase' },
                },
              }}
            />
          )}
        />
      </Box>

      <Divider />

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        justifyContent="flex-end"
        spacing={2}
        sx={{ p: { xs: 3, sm: 4 }, bgcolor: 'grey.50' }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
          data-testid="client-form-cancel-button"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          data-testid="client-form-submit-button"
        >
          {isLoading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Cadastrar Cliente'}
        </Button>
      </Stack>
    </Paper>
  );
}
