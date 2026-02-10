import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import theme from '@/styles/theme';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
