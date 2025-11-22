import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { getArea, createArea, updateArea } from "@/src/api/areas";

const AreaFormScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isEdit = !!id;

  const [nome, setNome] = useState("");

  useEffect(() => {
    if (isEdit && typeof id === "string") {
      loadArea(id);
    }
  }, [id]);

  const loadArea = async (areaId: string) => {
    try {
      const area = await getArea(areaId);
      setNome(area.nome);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a área");
    }
  };

  const handleSubmit = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome da área é obrigatório");
      return;
    }

    try {
      if (isEdit && typeof id === "string") {
        await updateArea(id, nome);
        Alert.alert("Sucesso", "Área atualizada com sucesso!");
      } else {
        await createArea(nome);
        Alert.alert("Sucesso", "Área criada com sucesso!");
      }
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a área");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: isEdit ? "Editar Área" : "Nova Área",
        }}
      />

      <View style={styles.form}>
        <Text style={styles.label}>Nome da Área *</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Elétrica, Hidráulica, Pintura..."
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isEdit ? "Atualizar Área" : "Criar Área"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AreaFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
  },
});
