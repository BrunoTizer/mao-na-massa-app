import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Mão na Massa</Text>
      <Text style={styles.subtitle}>Capacitação Profissional</Text>
      <Link replace href={"/(tabs)/cursos"} style={styles.link}>
        Entrar no Sistema
      </Link>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF6B35",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  link: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6B35",
  },
});
