'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { formatCarPlate, formatCPF, formatPhone } from '@/helpers';

import type { Client } from '../types';

interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  onClick?: (client: Client) => void;
}

export function ClientCard({ client, onEdit, onDelete, onClick }: ClientCardProps) {
  const isClickable = !!onClick;
  const testId = `client-card-${client.id}`;

  return (
    <Card
      variant="outlined"
      data-testid={testId}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': isClickable ? { borderColor: 'primary.main', boxShadow: 2 } : undefined,
      }}
      onClick={() => onClick?.(client)}
      role={isClickable ? 'button' : 'article'}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Ver detalhes de ${client.name}` : `Cliente ${client.name}`}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(client);
        }
      }}
    >
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography
              variant="subtitle1"
              component="h3"
              fontWeight={600}
              noWrap
              sx={{ flex: 1, mr: 1 }}
              data-testid={`${testId}-name`}
            >
              {client.name}
            </Typography>

            <Chip
              icon={<DirectionsCarIcon aria-hidden="true" />}
              label={formatCarPlate(client.carPlate)}
              size="small"
              variant="outlined"
              color="primary"
              data-testid={`${testId}-plate`}
              aria-label={`Placa do veículo: ${formatCarPlate(client.carPlate)}`}
            />
          </Box>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PhoneIcon aria-hidden="true" color="action" sx={{ fontSize: 16 }} />
            <Typography variant="body2" color="text.secondary" data-testid={`${testId}-phone`}>
              {formatPhone(client.phone)}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" data-testid={`${testId}-cpf`}>
            CPF: {formatCPF(client.cpf)}
          </Typography>
        </Stack>
      </CardContent>

      {(onEdit || onDelete) && (
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          {onEdit && (
            <Tooltip title="Editar">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(client);
                }}
                aria-label={`Editar cliente ${client.name}`}
                data-testid={`${testId}-edit-button`}
              >
                <EditIcon fontSize="small" aria-hidden="true" />
              </IconButton>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip title="Excluir">
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(client);
                }}
                aria-label={`Excluir cliente ${client.name}`}
                data-testid={`${testId}-delete-button`}
              >
                <DeleteOutlineIcon fontSize="small" aria-hidden="true" />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      )}
    </Card>
  );
}
