import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { mockUsers, type User, type UserFormValues } from "@gymflow/shared";

const USERS_STORAGE_KEY = "gymflow_users";

type UserStore = {
  users: User[];
  isLoaded: boolean;
  isLoading: boolean;

  loadUsers: () => Promise<void>;
  createUser: (values: UserFormValues) => Promise<void>;
  updateUser: (id: string, values: UserFormValues) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
  resetUsers: () => Promise<void>;
};

const saveUsers = async (users: User[]) => {
  await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoaded: false,
  isLoading: false,

  loadUsers: async () => {
    try {
      set({ isLoading: true });

      // Intentional delay to simulate loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);

      if (!storedUsers) {
        await saveUsers(mockUsers);
        set({ users: mockUsers, isLoaded: true });
        return;
      }

      set({
        users: JSON.parse(storedUsers),
        isLoaded: true,
      });
    } catch (error) {
      console.error("Failed to load users", error);
      set({ users: mockUsers, isLoaded: true });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (values) => {
    try {
      set({ isLoading: true });

      const newUser: User = {
        id: String(Date.now()),
        ...values,
      };

      const users = [newUser, ...get().users];

      set({ users });

      await saveUsers(users);
    } catch (error) {
      console.error("Failed to create user", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (id, values) => {
    try {
      set({ isLoading: true });

      const users = get().users.map((user) =>
        user.id === id ? { ...user, ...values } : user
      );

      set({ users });
      await saveUsers(users);
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeUser: async (id) => {
    try {
      set({ isLoading: true });

      const users = get().users.filter((user) => user.id !== id);

      set({ users });
      await saveUsers(users);
    } catch (error) {
      console.error("Failed to remove user", error);
    } finally {
      set({ isLoading: false });
    }
  },

  resetUsers: async () => {
    await AsyncStorage.removeItem(USERS_STORAGE_KEY);
  }
}));
