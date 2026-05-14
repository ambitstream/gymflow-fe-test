import { describe, expect, it } from "vitest";
import { userFormSchema } from "./user.schema.js";

describe("userFormSchema", () => {
  it("accepts valid user form values", () => {
    expect(
      userFormSchema.safeParse({
        fullName: "Alex Johnson",
        role: "MEMBER",
        dateOfBirth: "",
      }).success
    ).toBe(true);

    expect(
      userFormSchema.safeParse({
        fullName: "Maria Smith",
        role: "STAFF",
        dateOfBirth: "1995-04-12",
      }).success
    ).toBe(true);
  });

  it("rejects invalid user form values", () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    expect(
      userFormSchema.safeParse({
        fullName: "Al",
        role: "MEMBER",
        dateOfBirth: "",
      }).success
    ).toBe(false);

    expect(
      userFormSchema.safeParse({
        fullName: "A".repeat(51),
        role: "MEMBER",
        dateOfBirth: "",
      }).success
    ).toBe(false);

    expect(
      userFormSchema.safeParse({
        fullName: "Alex Johnson",
        role: "ADMIN",
        dateOfBirth: "",
      }).success
    ).toBe(false);

    expect(
      userFormSchema.safeParse({
        fullName: "Alex Johnson",
        role: "STAFF",
        dateOfBirth: futureDate,
      }).success
    ).toBe(false);
  });
});
