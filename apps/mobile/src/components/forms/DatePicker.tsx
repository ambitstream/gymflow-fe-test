import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { formStyles, commonStyles, colors } from "../../theme";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const isAndroid = Platform.OS === "android";

export default function DatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: Props) {
  const [visible, setVisible] = useState(false);
  const [draftDate, setDraftDate] = useState(
    value ? new Date(value) : new Date()
  );

  const handleConfirm = () => {
    onChange(draftDate.toISOString().slice(0, 10));
    setVisible(false);
  };

  return (
    <>
      <Pressable style={formStyles.input} onPress={() => setVisible(true)}>
        <Text style={!value && formStyles.placeholder}>
          {value || placeholder}
        </Text>
      </Pressable>

      {isAndroid && visible && (
        <DateTimePicker
          value={draftDate}
          mode="date"
          maximumDate={new Date()}
          display="default"
          onChange={(event, selectedDate) => {
            setVisible(false);
            if (event.type === "set" && selectedDate) {
              onChange(selectedDate.toISOString().slice(0, 10));
            }
        }}
        />
      )}
      {!isAndroid && (
        <Modal transparent visible={visible} animationType="slide">
          <Pressable
            style={styles.backdrop}
            onPress={() => setVisible(false)}
          >
            <Pressable style={styles.sheet}>
              <View style={styles.header}>
                <Pressable onPress={() => setVisible(false)}>
                  <Text>Cancel</Text>
                </Pressable>

                <Pressable onPress={handleConfirm}>
                  <Text style={commonStyles.link}>Done</Text>
                </Pressable>
              </View>

              <DateTimePicker
                value={draftDate}
                mode="date"
                maximumDate={new Date()}
                display="spinner"
                onChange={(_, selectedDate) => {
                  if (selectedDate) {
                    setDraftDate(selectedDate);
                  }
                }}
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
