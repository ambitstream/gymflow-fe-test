import { mockUsers } from "../shared/sharedModule.js";
import { writeUsers } from "../storage/usersStorage.js";

await writeUsers(mockUsers);

console.log(`Seeded ${mockUsers.length} users.`);
