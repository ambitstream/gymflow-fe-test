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
  error: string | null;

  loadUsers: () => Promise<void>;
  loadUser: (id: string) => Promise<void>;
  createUser: (values: UserFormValues) => Promise<void>;
  updateUser: (id: string, values: UserFormValues) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoaded: false,
  isLoading: false,
  error: null,

  loadUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getUsers();

      set({
        users: response.data,
        isLoaded: true,
      });
    } catch (error) {
      console.error("Failed to load users", error);

      set({
        error: "Failed to load users",
        isLoaded: true,
      });
    } finally {
      set({ isLoading: false });
    }
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
