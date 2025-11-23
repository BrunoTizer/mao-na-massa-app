import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

type LoadingProps = {
  message?: string;
};

const Loading = ({ message = "Carregando..." }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
