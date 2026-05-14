import { mockUsers } from "@gymflow/shared";
import { writeUsers } from "../storage/usersStorage.js";

await writeUsers(mockUsers);

console.log(`Seeded ${mockUsers.length} users.`);
