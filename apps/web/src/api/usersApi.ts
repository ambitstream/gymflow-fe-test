import type { User, UserFormValues } from "@gymflow/shared";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type UsersResponse = {
  data: User[];
  pagination: Pagination;
};

const request = async <ResponseData>(
  path: string,
  options?: RequestInit
): Promise<ResponseData> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message ?? "API request failed");
  }

  if (response.status === 204) {
    return undefined as ResponseData;
  }

  return response.json() as Promise<ResponseData>;
};

export const getUsers = async (page: number = 1, limit: number = 20) => {
  return request<UsersResponse>(`/users?page=${page}&limit=${limit}`);
};

export const getUserById = async (id: string) => {
  return request<User>(`/users/${id}`);
};

export const createUser = async (values: UserFormValues) => {
  return request<User>("/users", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateUser = async (id: string, values: UserFormValues) => {
  return request<User>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
};

export const deleteUser = async (id: string) => {
  await request<void>(`/users/${id}`, {
    method: "DELETE",
  });
};
