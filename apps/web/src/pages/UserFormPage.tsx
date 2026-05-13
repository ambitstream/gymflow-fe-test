import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { fieldAnimation } from "../helpers/animation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  USER_ROLE_OPTIONS,
  type UserFormValues,
  userFormSchema,
} from "@gymflow/shared";

import { Button, Layout } from "../components";
import { DatePicker, Select, TextField } from "../components/forms";
import { useUserStore } from "../store/userStore";

export default function UserFormPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const isCreateMode = userId === "new";

  const users = useUserStore((state) => state.users);

  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const removeUser = useUserStore((state) => state.removeUser);

  const user = users.find((item) => item.id === userId);

  const defaultValues: UserFormValues = {
    fullName: user?.fullName ?? "",
    role: user?.role ?? "MEMBER",
    dateOfBirth: user?.dateOfBirth ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    defaultValues,
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: UserFormValues) => {
    if (isCreateMode) {
      await createUser(values);
    } else if (userId) {
      await updateUser(userId, values);
    }

    navigate("/users");
  };

  const onDelete = async () => {
    if (!userId) return;

    await removeUser(userId);

    navigate("/users");
  };

  return (
    <Layout
      title={isCreateMode ? "Create User" : "Edit User"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-6">
          <motion.div {...fieldAnimation(0)}>
            <Select<UserFormValues>
              error={errors.role}
              label="Role"
              name="role"
              options={USER_ROLE_OPTIONS}
              register={register}
              required
            />
          </motion.div>

          <motion.div {...fieldAnimation(1)}>
            <TextField<UserFormValues>
              error={errors.fullName}
              label="Full Name"
              name="fullName"
              placeholder="Enter full name"
              register={register}
              required
            />
          </motion.div>

          <motion.div {...fieldAnimation(2)}>
            <DatePicker<UserFormValues>
              error={errors.dateOfBirth}
              label="Date of Birth"
              name="dateOfBirth"
              register={register}
            />
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            title={isCreateMode ? "Create user" : "Update user"}
            type="submit"
            disabled={!isValid}
          />

          {!isCreateMode && (
            <Button
              title="Remove user"
              type="button"
              variant="danger"
              onClick={onDelete}
            />
          )}
        </div>
      </form>
    </Layout>
  );
}
