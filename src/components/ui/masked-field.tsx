'use client';

import TextField from '@mui/material/TextField';
import { forwardRef, useCallback } from 'react';

import { maskCPF, maskCarPlate, maskPhone, unmask, unmaskCarPlate } from '@/helpers';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ChangeEvent, HTMLAttributes } from 'react';

type MaskType = 'cpf' | 'phone' | 'carPlate';

type MaskedFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  mask: MaskType;
  value: string;
  onChange: (value: string) => void;
};

const masks: Record<MaskType, { apply: (v: string) => string; remove: (v: string) => string }> = {
  cpf: { apply: maskCPF, remove: unmask },
  phone: { apply: maskPhone, remove: unmask },
  carPlate: { apply: maskCarPlate, remove: unmaskCarPlate },
};

const inputModes: Record<MaskType, HTMLAttributes<HTMLInputElement>['inputMode']> = {
  cpf: 'numeric',
  phone: 'tel',
  carPlate: 'text',
};

const autoCompleteMap: Record<MaskType, string> = {
  cpf: 'off',
  phone: 'tel',
  carPlate: 'off',
};

export const MaskedField = forwardRef<HTMLInputElement, MaskedFieldProps>(function MaskedField(
  { mask, onChange, value = '', slotProps, ...props },
  ref
) {
  const { apply, remove } = masks[mask];

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(remove(e.target.value));
    },
    [onChange, remove]
  );

  return (
    <TextField
      {...props}
      inputRef={ref}
      value={apply(value)}
      onChange={handleChange}
      slotProps={{
        ...slotProps,
        htmlInput: {
          inputMode: inputModes[mask],
          autoComplete: autoCompleteMap[mask],
          ...slotProps?.htmlInput,
        },
      }}
    />
  );
});
