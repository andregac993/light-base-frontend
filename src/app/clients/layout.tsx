import { AppLayout } from '@/components/layout';

import type { ReactNode } from 'react';

interface ClientsLayoutProps {
  children: ReactNode;
}

export default function ClientsLayout({ children }: ClientsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
