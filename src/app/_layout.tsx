import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/src/contexts/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Mão na Massa" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          options={{ headerTitle: "Criar Conta" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
};

export default RootLayout;
