'use client';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useId, useState } from 'react';

import { useDebounce } from '@/hooks/common';

interface SearchFieldProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  fullWidth?: boolean;
  label?: string;
}

export function SearchField({
  onSearch,
  placeholder = 'Buscar...',
  debounceMs = 400,
  fullWidth = false,
  label = 'Buscar',
}: SearchFieldProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);
  const inputId = useId();

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <TextField
      id={inputId}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      size="small"
      fullWidth={fullWidth}
      aria-label={label}
      role="search"
      data-testid="search-field"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" color="action" fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                aria-label="Limpar busca"
                edge="end"
                data-testid="search-field-clear-button"
              >
                <ClearIcon fontSize="small" aria-hidden="true" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
        htmlInput: {
          'data-testid': 'search-field-input',
        },
      }}
      sx={{ maxWidth: fullWidth ? undefined : { sm: 360 } }}
    />
  );
}
