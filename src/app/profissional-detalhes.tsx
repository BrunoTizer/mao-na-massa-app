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
import { getProfissional, deleteProfissional } from "@/src/api/profissionais";
import { Profissional } from "@/src/types/profissionais";
import { getErrorMessage } from "@/src/utils/errorHandler";

const ProfissionalDetalhesScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const loadProfissional = async () => {
    try {
      const data = await getProfissional(id as string);
      setProfissional(data);
    } catch (error) {
      console.error("Erro ao carregar profissional:", error);
      setError("Não foi possível carregar o profissional");
    }
  };

  const openDeleteModal = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProfissional(id as string);
      setShowModal(false);
      router.back();
    } catch (error: any) {
      setShowModal(false);
      setError(getErrorMessage(error, "Erro ao excluir profissional"));
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    router.push(`/profissional-form?id=${id}`);
  };

  useEffect(() => {
    loadProfissional();
  }, [id]);

  if (!profissional) {
    return <Loading message="Carregando profissional..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Detalhes do Profissional" }} />

      <Text style={styles.title}>{profissional.usuario.nome}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profissional.usuario.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.value}>{profissional.usuario.cidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Área:</Text>
          <Text style={styles.value}>
            {profissional.usuario.area?.nome || "Área não definida"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Avaliação:</Text>
          <Text style={styles.rating}>
            ⭐ {profissional.avaliacaoMedia.toFixed(1)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={profissional.disponivel ? styles.available : styles.unavailable}>
            {profissional.disponivel ? "✅ Disponível" : "⏸️ Indisponível"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{profissional.descricao}</Text>
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
        message="Tem certeza que deseja excluir este profissional?"
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

export default ProfissionalDetalhesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
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
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.warning,
  },
  available: {
    fontSize: 16,
    color: Colors.success,
    fontWeight: "bold",
  },
  unavailable: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.5,
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
  description: {
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
