import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Text, TextInput, View, Pressable } from "react-native";

import { formStyles, commonStyles } from "../../theme";
import type { SelectOption } from "./Select";

import Select from "./Select";
import DatePicker from "./DatePicker";

type FieldType = "textInput" | "select" | "datePicker";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: FieldType;
  options?: SelectOption[];
  required?: boolean,
  clearable?: boolean,
};

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  options,
  required,
  clearable
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const renderFieldControl = () => {
          switch (type) {
            case "select":
              return (
                <Select
                  value={value}
                  onChange={onChange}
                  options={options || []}
                />
              );

            case "datePicker":
              return (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                />
              );

            case "textInput":
            default:
              return (
                <TextInput
                  style={[formStyles.input, error && formStyles.inputError]}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  placeholderTextColor={formStyles.placeholder.color}
                />
              );
          }
        };

        return (
          <View style={formStyles.fieldWrapper}>
            <View style={formStyles.fieldHeader}>
              <Text style={formStyles.label}>
                {label} {required && <Text style={formStyles.errorText}>*</Text>}
              </Text>
              {value && clearable && (
                <Pressable
                  onPress={() => onChange('')}
                >
                  <Text style={commonStyles.link}>Clear</Text>
                </Pressable>
              )}
            </View>

            {renderFieldControl()}

            {error?.message && (
              <Text style={formStyles.errorText}>{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
