import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Mão na Massa" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default RootLayout;
