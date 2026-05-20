export const API_ROUTES = {
  users: "/users",
  userById: (id: string) => `/users/${id}`,
} as const;