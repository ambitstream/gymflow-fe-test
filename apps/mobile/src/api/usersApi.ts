import type { User, UserFormValues, PaginatedResponse } from "@gymflow/shared";
import { API_ROUTES } from "@gymflow/shared";
import { request } from "./client";

type UsersResponse = PaginatedResponse<User>;

export const getUsers = async (page: number = 1, limit: number = 20) => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  return request<UsersResponse>(`${API_ROUTES.users}?${searchParams}`);
};

export const getUserById = async (id: string) => {
  return request<User>(API_ROUTES.userById(id));
};

export const createUser = async (values: UserFormValues) => {
  return request<User>(API_ROUTES.users, {
    method: "POST",
    body: JSON.stringify(values),
  });
};

export const updateUser = async (id: string, values: UserFormValues) => {
  return request<User>(API_ROUTES.userById(id), {
    method: "PATCH",
    body: JSON.stringify(values),
  });
};

export const deleteUser = async (id: string) => {
  await request<void>(API_ROUTES.userById(id), {
    method: "DELETE",
  });
};
