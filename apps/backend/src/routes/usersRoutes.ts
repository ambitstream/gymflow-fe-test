import { Router } from "express";
import { userFormSchema } from "../shared/sharedModule.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../services/usersService.js";

const userUpdateSchema = userFormSchema.partial();

const parsePositiveIntegerQuery = (value: unknown) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue < 1) {
    return null;
  }

  return numberValue;
};

type ValidationError = {
  flatten: () => { fieldErrors: Record<string, string[]> };
};

const getValidationErrorResponse = (error: ValidationError) => ({
  message: "Validation failed",
  errors: error.flatten().fieldErrors,
});

export const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const page = parsePositiveIntegerQuery(request.query.page);
  const limit = parsePositiveIntegerQuery(request.query.limit);

  if (page === null || limit === null) {
    response.status(400).json({
      message: "Pagination query parameters must be positive integers",
    });
    return;
  }

  const users = await getUsers({ page, limit });

  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await getUserById(request.params.id);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const result = userFormSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json(getValidationErrorResponse(result.error));
    return;
  }

  const user = await createUser(result.data);

  response.status(201).json(user);
});

usersRouter.patch("/:id", async (request, response) => {
  const result = userUpdateSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json(getValidationErrorResponse(result.error));
    return;
  }

  if (Object.keys(result.data).length === 0) {
    response.status(400).json({ message: "At least one field is required" });
    return;
  }

  const user = await updateUser(request.params.id, result.data);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.json(user);
});

usersRouter.delete("/:id", async (request, response) => {
  const isDeleted = await deleteUser(request.params.id);

  if (!isDeleted) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.status(204).send();
});
