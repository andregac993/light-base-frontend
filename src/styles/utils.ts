import type { SxProps, Theme } from '@mui/material/styles';

export const visuallyHidden: SxProps<Theme> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function mergeSx(baseSx: SxProps<Theme>, overrideSx?: SxProps<Theme>): SxProps<Theme> {
  if (!overrideSx) return baseSx;

  return [
    ...(Array.isArray(baseSx) ? baseSx : [baseSx]),
    ...(Array.isArray(overrideSx) ? overrideSx : [overrideSx]),
  ];
}
