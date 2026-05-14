import { USER_ROLE_VALUES } from "./user.constants.js";

export type UserRole = (typeof USER_ROLE_VALUES)[number];

export type User = {
  id: string;
  fullName: string;
  role: UserRole;
  dateOfBirth?: string;
};
