import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../store/userStore";
import Button from '../components/Button';

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { type UserFormValues, USER_ROLE_OPTIONS, userFormSchema } from "@gymflow/shared";

import FormField from '../components/forms/FormField';
import AnimatedFormSection from "../components/forms/AnimatedFormSection";

import { formStyles, commonStyles } from "../theme";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "EditUser"
>;

export default function UsersFormScreen({ route, navigation }: Props) {
  const userId = route.params.userId;
  const isCreateMode = userId === "new";

  const users = useUserStore((state) => state.users);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const loadUser = useUserStore((state) => state.loadUser);
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const removeUser = useUserStore((state) => state.removeUser);

  const selectedUserForRoute =
    selectedUser?.id === userId ? selectedUser : null;

  const user = isCreateMode
    ? null
    : users.find((item) => item.id === userId) ?? selectedUserForRoute;

  const defaultValues: UserFormValues = {
    fullName: user?.fullName ?? "",
    role: user?.role ?? "MEMBER",
    dateOfBirth: user?.dateOfBirth ?? "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<UserFormValues>({
    defaultValues,
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!isCreateMode && userId && !user) {
      void loadUser(userId);
    }
  }, [isCreateMode, loadUser, user, userId]);

  useEffect(() => {
    reset(defaultValues);
  }, [reset, user?.id, user?.fullName, user?.role, user?.dateOfBirth]);

  const onSubmit = async (values: UserFormValues) => {
    if (isCreateMode) {
      await createUser(values);
    } else {
      await updateUser(userId, values);
    }
    navigation.goBack();
  };

  const onDelete = async () => {
    await removeUser(userId);

    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <View style={formStyles.formWrapper}>
        <AnimatedFormSection index={0}>
          <FormField<UserFormValues>
            type="select"
            options={USER_ROLE_OPTIONS}
            control={control}
            name="role"
            label="Role"
            placeholder="Role"
            required
          />
        </AnimatedFormSection>

        <AnimatedFormSection index={1}>
          <FormField<UserFormValues>
            type="textInput"
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            required
          />
        </AnimatedFormSection>

        <AnimatedFormSection index={2}>
          <FormField<UserFormValues>
            type="datePicker"
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            clearable
          />
        </AnimatedFormSection>
      </View>
      <View style={commonStyles.buttonWrapperLite}>
        <Button
          title={isCreateMode ? "Create user" : "Update user"}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />

        {!isCreateMode &&
          <Button
            title="Remove user"
            variant="danger"
            onPress={onDelete} />
        }
      </View>
    </View>
  );
}
