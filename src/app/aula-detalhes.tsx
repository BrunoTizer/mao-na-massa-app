import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ConfirmModal from "@/components/ConfirmModal";
import AlertModal from "@/components/AlertModal";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import { getAula, deleteAula } from "@/src/api/aulas";
import { Aula } from "@/src/types/aulas";

const AulaDetalhesScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [aula, setAula] = useState<Aula | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const loadAula = async () => {
    try {
      const data = await getAula(id as string);
      setAula(data);
    } catch (error) {
      console.error("Erro ao carregar aula:", error);
      setError("Não foi possível carregar a aula");
    }
  };

  const openDeleteModal = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAula(id as string);
      setShowModal(false);
      router.back();
    } catch (error: any) {
      setShowModal(false);
      setError(error?.response?.data || "Erro ao excluir aula");
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    router.push(`/aula-form?id=${id}&cursoId=${aula?.curso.id}`);
  };

  useEffect(() => {
    loadAula();
  }, [id]);

  if (!aula) {
    return <Loading message="Carregando aula..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Aula ${aula.ordem}` }} />

      <Text style={styles.ordem}>Aula {aula.ordem}</Text>
      <Text style={styles.title}>{aula.titulo}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Curso:</Text>
          <Text style={styles.value}>{aula.curso.titulo}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Ordem:</Text>
          <Text style={styles.value}>{aula.ordem}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conteúdo</Text>
        <Text style={styles.conteudo}>{aula.conteudo}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={openDeleteModal}>
          <Text style={styles.buttonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={showModal}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta aula?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <AlertModal
        visible={!!error}
        title="Erro"
        message={error}
        onClose={() => setError("")}
      />
    </ScrollView>
  );
};

export default AulaDetalhesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  ordem: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: Colors.text,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  conteudo: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.warning,
    padding: 15,
    borderRadius: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.danger,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
