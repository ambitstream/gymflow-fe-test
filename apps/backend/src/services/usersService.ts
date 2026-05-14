import { randomUUID } from "node:crypto";
import type { User, UserFormValues } from "@gymflow/shared";
import { readUsers, writeUsers } from "../storage/usersStorage.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export type GetUsersParams = {
  page?: number;
  limit?: number;
};

export type PaginatedUsers = {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type UpdateUserInput = Partial<UserFormValues>;

const normalizePositiveInteger = (value: number | undefined, fallback: number) => {
  if (value === undefined || !Number.isFinite(value) || value < 1) {
    return fallback;
  }

  return Math.floor(value);
};

const normalizeLimit = (limit: number | undefined) => {
  return Math.min(normalizePositiveInteger(limit, DEFAULT_LIMIT), MAX_LIMIT);
};

const normalizeUserValues = (values: UserFormValues): Omit<User, "id"> => {
  const dateOfBirth = values.dateOfBirth.trim();

  return {
    fullName: values.fullName.trim(),
    role: values.role,
    ...(dateOfBirth ? { dateOfBirth } : {}),
  };
};

const normalizeUserUpdateValues = (values: UpdateUserInput): Partial<Omit<User, "id">> => {
  const normalizedValues: Partial<Omit<User, "id">> = {};

  if (values.fullName !== undefined) {
    normalizedValues.fullName = values.fullName.trim();
  }

  if (values.role !== undefined) {
    normalizedValues.role = values.role;
  }

  if (values.dateOfBirth !== undefined) {
    const dateOfBirth = values.dateOfBirth.trim();

    normalizedValues.dateOfBirth = dateOfBirth || undefined;
  }

  return normalizedValues;
};

export const getUsers = async (params: GetUsersParams = {}): Promise<PaginatedUsers> => {
  const users = await readUsers();
  const page = normalizePositiveInteger(params.page, DEFAULT_PAGE);
  const limit = normalizeLimit(params.limit);
  const total = users.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const data = users.slice(startIndex, startIndex + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getUserById = async (id: string): Promise<User | null> => {
  const users = await readUsers();

  return users.find((user) => user.id === id) ?? null;
};

export const createUser = async (values: UserFormValues): Promise<User> => {
  const users = await readUsers();
  const newUser: User = {
    id: randomUUID(),
    ...normalizeUserValues(values),
  };

  await writeUsers([newUser, ...users]);

  return newUser;
};

export const updateUser = async (
  id: string,
  values: UpdateUserInput
): Promise<User | null> => {
  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const updatedUser: User = {
    ...users[userIndex],
    ...normalizeUserUpdateValues(values),
  };
  const updatedUsers = users.with(userIndex, updatedUser);

  await writeUsers(updatedUsers);

  return updatedUser;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const users = await readUsers();
  const nextUsers = users.filter((user) => user.id !== id);

  if (nextUsers.length === users.length) {
    return false;
  }

  await writeUsers(nextUsers);

  return true;
};
