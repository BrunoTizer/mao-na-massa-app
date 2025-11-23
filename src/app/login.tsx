import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import CustomInput from "@/components/CustomInput";
import AlertModal from "@/components/AlertModal";
import { Colors } from "@/constants/Colors";

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await login({ email, senha });
      router.replace("/(tabs)/cursos");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setError(error?.response?.data?.message || "Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <View style={styles.form}>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Sua senha"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registerText}>
            Não tem conta? <Text style={styles.registerBold}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <AlertModal
        visible={!!error}
        title="Erro"
        message={error}
        onClose={() => setError("")}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  registerBold: {
    fontWeight: "bold",
    color: Colors.primary,
  },
});
