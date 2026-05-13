import { View } from "react-native";
import { formStyles } from "../../theme";
import Button from "../Button";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
};

export default function Select({
  onChange,
  options,
  value,
}: SelectProps) {
  return (
    <View style={formStyles.fieldWrapper}>
        <View style={formStyles.selectWrapper}>
            {options.map((item, i) => (
                <Button
                    key={`${item.value}-${i}`}
                    title={item.label}
                    onPress={() => onChange(item.value)}
                    size="small"
                    active={item.value === value}
                    isChip
                />
            ))}
        </View>
    </View>
  );
}