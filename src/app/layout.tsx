import { AppProviders } from '@/providers/app-providers';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Gerenciamento de Clientes',
  description: 'Sistema de controle de clientes e placas de veículos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
