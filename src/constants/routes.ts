export const ROUTES = {
  HOME: '/',
  CLIENTS: {
    LIST: '/clients',
    NEW: '/clients/new',
    DETAILS: (id: string) => `/clients/${id}`,
    EDIT: (id: string) => `/clients/${id}/edit`,
  },
} as const;
