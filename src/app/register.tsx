import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import CustomInput from "@/components/CustomInput";
import CustomPicker from "@/components/CustomPicker";
import AlertModal from "@/components/AlertModal";
import { Colors } from "@/constants/Colors";

const RegisterScreen = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha || !cidade || !tipoUsuario) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await register({ nome, email, senha, cidade, tipoUsuario });
      router.replace("/(tabs)/cursos");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      setError(error?.response?.data?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Criar Conta" }} />

      <Text style={styles.title}>Cadastre-se</Text>
      <Text style={styles.subtitle}>Crie sua conta para começar</Text>

      <View style={styles.form}>
        <CustomInput
          label="Nome completo"
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
        />

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
          placeholder="Crie uma senha"
          secureTextEntry
        />

        <CustomInput
          label="Cidade"
          value={cidade}
          onChangeText={setCidade}
          placeholder="Ex: São Paulo"
        />

        <CustomPicker
          label="Você é:"
          selectedValue={tipoUsuario}
          onValueChange={setTipoUsuario}
          items={[
            { label: "Aluno (quero aprender)", value: "ALUNO" },
            { label: "Profissional (quero trabalhar)", value: "PROFISSIONAL" },
          ]}
          placeholder="Selecione uma opção"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.back()}
        >
          <Text style={styles.loginText}>
            Já tem conta? <Text style={styles.loginBold}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <AlertModal
        visible={!!error}
        title="Erro"
        message={error}
        onClose={() => setError("")}
      />
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
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
  loginLink: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loginBold: {
    fontWeight: "bold",
    color: Colors.primary,
  },
});
