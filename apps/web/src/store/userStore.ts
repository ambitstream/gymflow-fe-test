import { create } from "zustand";
import type { User, UserFormValues } from "@gymflow/shared";
import {
  createUser as createUserRequest,
  deleteUser,
  getUserById,
  getUsers,
  updateUser as updateUserRequest,
} from "../api/usersApi";

type UserStore = {
  users: User[];
  selectedUser: User | null;
  isLoaded: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  loadUsers: (page?: number, limit?: number) => Promise<void>;
  loadNextUsersPage: () => Promise<void>;
  loadUser: (id: string) => Promise<void>;
  createUser: (values: UserFormValues) => Promise<void>;
  updateUser: (id: string, values: UserFormValues) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
};

const DEFAULT_USERS_LIMIT = 10;

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoaded: false,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  pagination: {
    page: 1,
    limit: DEFAULT_USERS_LIMIT,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },

  loadUsers: async (page = 1, limit = DEFAULT_USERS_LIMIT) => {
    const shouldAppendUsers = page > 1;

    try {
      set({
        [shouldAppendUsers ? "isLoadingMore" : "isLoading"]: true,
        error: null,
      });
      const response = await getUsers(page, limit);

      set((state) => ({
        users: shouldAppendUsers
          ? [...state.users, ...response.data]
          : response.data,
        pagination: response.pagination,
        isLoaded: true,
      }));
    } catch (error) {
      console.error("Failed to load users", error);

      set({
        error: "Failed to load users",
        isLoaded: true,
      });
    } finally {
      set({
        isLoading: false,
        isLoadingMore: false,
      });
    }
  },

  loadNextUsersPage: async () => {
    const { isLoading, isLoadingMore, pagination, loadUsers } = get();

    if (isLoading || isLoadingMore || !pagination.hasNextPage) {
      return;
    }

    await loadUsers(pagination.page + 1, pagination.limit);
  },

  loadUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const user = await getUserById(id);

      set({ selectedUser: user });
    } catch (error) {
      console.error("Failed to load user", error);

      set({
        selectedUser: null,
        error: "Failed to load user",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (values) => {
    try {
      set({ isLoading: true, error: null });
      const newUser = await createUserRequest(values);

      set({ users: [newUser, ...get().users] });
    } catch (error) {
      console.error("Failed to create user", error);
      set({ error: "Failed to create user" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (id, values) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await updateUserRequest(id, values);

      const users = get().users.map((user) =>
        user.id === id ? updatedUser : user
      );

      set({
        users,
        selectedUser: updatedUser,
      });
    } catch (error) {
      console.error("Failed to update user", error);
      set({ error: "Failed to update user" });
    } finally {
      set({ isLoading: false });
    }
  },

  removeUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await deleteUser(id);

      const users = get().users.filter((user) => user.id !== id);

      set({
        users,
        selectedUser: null,
      });
    } catch (error) {
      console.error("Failed to remove user", error);
      set({ error: "Failed to remove user" });
    } finally {
      set({ isLoading: false });
    }
  }
}));
