import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { mockUsers, type User } from "@gymflow/shared";

const dataDirectoryPath = path.resolve(process.cwd(), "data");
const usersFilePath = path.join(dataDirectoryPath, "users.json");
const temporaryUsersFilePath = path.join(dataDirectoryPath, "users.tmp.json");

const ensureDataDirectory = async () => {
  await mkdir(dataDirectoryPath, { recursive: true });
};

const isMissingFileError = (error: unknown) => {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
};

const getInitialUsers = (): User[] => {
  return mockUsers.map((user) => ({ ...user }));
};

export const readUsers = async (): Promise<User[]> => {
  await ensureDataDirectory();

  try {
    const usersJson = await readFile(usersFilePath, "utf8");

    return JSON.parse(usersJson) as User[];
  } catch (error) {
    if (isMissingFileError(error)) {
      const initialUsers = getInitialUsers();

      await writeUsers(initialUsers);

      return initialUsers;
    }

    throw error;
  }
};

export const writeUsers = async (users: User[]) => {
  await ensureDataDirectory();

  const usersJson = `${JSON.stringify(users, null, 2)}\n`;

  await writeFile(temporaryUsersFilePath, usersJson, "utf8");
  await rename(temporaryUsersFilePath, usersFilePath);
};
