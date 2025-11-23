import { StyleSheet, Text, TextInput, View, TextInputProps } from "react-native";
import { Colors } from "@/constants/Colors";

type CustomInputProps = TextInputProps & {
  label: string;
  multiline?: boolean;
};

const CustomInput = ({ label, multiline, ...props }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholderTextColor={Colors.textSecondary}
        {...props}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    color: Colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});
