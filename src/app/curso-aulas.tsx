import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import AlertModal from "@/components/AlertModal";
import ConfirmModal from "@/components/ConfirmModal";
import { Colors } from "@/constants/Colors";
import { getAulasByCurso, deleteAula } from "@/src/api/aulas";
import { Aula } from "@/src/types/aulas";
import { getErrorMessage } from "@/src/utils/errorHandler";

const CursoAulasScreen = () => {
  const { cursoId, titulo } = useLocalSearchParams();
  const router = useRouter();
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [aulaToDelete, setAulaToDelete] = useState<{ id: string; titulo: string } | null>(null);

  const loadAulas = async () => {
    try {
      setLoading(true);
      const lista = await getAulasByCurso(cursoId as string);
      setAulas(lista.sort((a, b) => a.ordem - b.ordem));
    } catch (error) {
      console.error("Erro ao carregar aulas:", error);
      setError("Erro ao carregar aulas");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string, titulo: string) => {
    setAulaToDelete({ id, titulo });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!aulaToDelete) return;

    try {
      await deleteAula(aulaToDelete.id);
      setShowModal(false);
      setAulaToDelete(null);
      loadAulas();
    } catch (error: any) {
      setShowModal(false);
      setError(getErrorMessage(error, "Erro ao excluir aula"));
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setAulaToDelete(null);
  };

  useEffect(() => {
    loadAulas();
  }, [cursoId]);

  if (loading) {
    return <Loading message="Carregando aulas..." />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Aulas - ${titulo}` }} />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push(`/aula-form?cursoId=${cursoId}`)}
        >
          <Text style={styles.createButtonText}>+ Nova Aula</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={loadAulas}>
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {aulas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma aula cadastrada ainda</Text>
        ) : (
          aulas.map((aula) => (
            <Card key={aula.id}>
              <View style={styles.aulaHeader}>
                <Text style={styles.ordem}>Aula {aula.ordem}</Text>
                <Text style={styles.titulo}>{aula.titulo}</Text>
              </View>
              <Text style={styles.conteudo} numberOfLines={3}>
                {aula.conteudo}
              </Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => router.push(`/aula-detalhes?id=${aula.id}`)}
                >
                  <Text style={styles.viewButtonText}>👁️ Ver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push(`/aula-form?id=${aula.id}&cursoId=${cursoId}`)}
                >
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => openDeleteModal(aula.id, aula.titulo)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      <ConfirmModal
        visible={showModal}
        title="Confirmar exclusão"
        message={`Deseja excluir a aula "${aulaToDelete?.titulo}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <AlertModal
        visible={!!error}
        title="Erro"
        message={error}
        onClose={() => setError("")}
      />
    </View>
  );
};

export default CursoAulasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  createButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
    padding: 12,
    borderRadius: 8,
    width: 50,
  },
  refreshText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.text,
    marginTop: 40,
  },
  aulaHeader: {
    marginBottom: 10,
  },
  ordem: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  conteudo: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 6,
  },
  viewButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.warning,
    padding: 8,
    borderRadius: 6,
  },
  editButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    padding: 8,
    borderRadius: 6,
    width: 40,
  },
  deleteButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
  },
});
