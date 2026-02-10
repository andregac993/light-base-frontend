'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

import type { ReactNode } from 'react';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

const variantColorMap = {
  danger: 'error',
  warning: 'warning',
  info: 'primary',
} as const;

interface ConfirmState extends ConfirmOptions {
  open: boolean;
}

const initialState: ConfirmState = {
  open: false,
  title: '',
  message: '',
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState>(initialState);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setState({ ...options, open: true });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    setState(initialState);
  }, []);

  const handleCancel = useCallback(() => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    setState(initialState);
  }, []);

  const {
    open,
    title,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'info',
  } = state;

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        role="alertdialog"
        maxWidth="xs"
        fullWidth
        data-testid="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog-title" data-testid="confirm-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="confirm-dialog-description" data-testid="confirm-dialog-message">
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="inherit" data-testid="confirm-dialog-cancel-button">
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={variantColorMap[variant]}
            autoFocus
            data-testid="confirm-dialog-confirm-button"
          >
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return context;
}
