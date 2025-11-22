import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { getCurso, deleteCurso } from "@/src/api/cursos";
import { Curso } from "@/src/types/cursos";

const CursoDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [curso, setCurso] = useState<Curso | null>(null);

  const loadCurso = async () => {
    try {
      const data = await getCurso(id as string);
      setCurso(data);
    } catch (error) {
      console.error("Erro ao carregar curso:", error);
      Alert.alert("Erro", "Não foi possível carregar o curso");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este curso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCurso(id as string);
              Alert.alert("Sucesso", "Curso excluído com sucesso");
              router.back();
            } catch (error) {
              console.error("Erro ao excluir curso:", error);
              Alert.alert("Erro", "Não foi possível excluir o curso");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/curso-form?id=${id}`);
  };

  useEffect(() => {
    loadCurso();
  }, [id]);

  if (!curso) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Detalhes do Curso" }} />

      <View style={styles.header}>
        <Text style={styles.title}>{curso.titulo}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{curso.area.nome}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nível</Text>
        <Text style={styles.value}>{curso.nivel}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.description}>{curso.descricao}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Data de Criação</Text>
        <Text style={styles.value}>{new Date(curso.dataCriacao).toLocaleDateString('pt-BR')}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CursoDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
