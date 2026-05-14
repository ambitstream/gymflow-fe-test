import { z } from "zod";
import { USER_ROLE_VALUES } from "./user.constants.js";

export const userRoleSchema = z.enum(USER_ROLE_VALUES);

export const userFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters"),

  role: userRoleSchema,

  dateOfBirth: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Date of birth must be in YYYY-MM-DD format"
    )
    .refine(
      (value) => {
        if (value === "") return true;

        const today = new Date().toISOString().slice(0, 10);

        return value <= today;
      },
      "Date of birth cannot be in the future"
    ),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
