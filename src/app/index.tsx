import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const IndexScreen = () => {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.replace("/(tabs)/cursos");
      } else {
        router.replace("/login");
      }
    }
  }, [token, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Mão na Massa</Text>
      <Text style={styles.subtitle}>Capacitação Profissional</Text>
      <ActivityIndicator size="large" color="#fff" />
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
