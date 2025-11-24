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
import { getServico, deleteServico, aceitarServico } from "@/src/api/servicos";
import { Servico } from "@/src/types/servicos";
import { useAuth } from "@/src/contexts/AuthContext";
import { getProfissionais } from "@/src/api/profissionais";

const ServicoDetalhesScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [servico, setServico] = useState<Servico | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [profissionalId, setProfissionalId] = useState<string | null>(null);

  const loadServico = async () => {
    try {
      const data = await getServico(id as string);
      setServico(data);

      if (user?.tipoUsuario === "PROFISSIONAL") {
        const profissionais = await getProfissionais();
        const meuProfissional = profissionais.find(p => p.usuario.id === user.id);
        if (meuProfissional) {
          setProfissionalId(meuProfissional.id);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar serviço:", error);
      setError("Não foi possível carregar o serviço");
    }
  };

  const handleAceitar = async () => {
    if (!profissionalId) {
      setError("Você precisa ter um perfil de profissional para aceitar solicitações");
      return;
    }

    try {
      await aceitarServico(id as string, profissionalId);
      loadServico();
    } catch (error: any) {
      setError(error?.response?.data || "Erro ao aceitar serviço");
    }
  };

  const openDeleteModal = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteServico(id as string);
      setShowModal(false);
      router.back();
    } catch (error: any) {
      setShowModal(false);
      setError(error?.response?.data || "Erro ao excluir serviço");
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    router.push(`/servico-form?id=${id}`);
  };

  useEffect(() => {
    loadServico();
  }, [id]);

  if (!servico) {
    return <Loading message="Carregando serviço..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Detalhes do Serviço" }} />

      <Text style={styles.title}>{servico.titulo}</Text>

      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>
          {servico.status === "PENDENTE" ? "🕒 Aguardando Profissional" : "✅ Aceito"}
        </Text>
      </View>

      <View style={styles.infoCard}>
        {servico.profissional ? (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Profissional:</Text>
              <Text style={styles.value}>{servico.profissional.usuario.nome}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Avaliação:</Text>
              <Text style={styles.rating}>
                ⭐ {servico.profissional.avaliacaoMedia.toFixed(1)}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.pendingText}>
            Aguardando um profissional aceitar esta solicitação
          </Text>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.value}>{servico.cidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Preço:</Text>
          <Text style={styles.price}>R$ {servico.preco.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{servico.descricao}</Text>
      </View>

      {servico.status === "PENDENTE" && user?.tipoUsuario === "PROFISSIONAL" && (
        <TouchableOpacity style={styles.acceptButton} onPress={handleAceitar}>
          <Text style={styles.acceptButtonText}>✅ Aceitar Solicitação</Text>
        </TouchableOpacity>
      )}

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
        message="Tem certeza que deseja excluir este serviço?"
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

export default ServicoDetalhesScreen;

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
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  pendingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: "italic",
    paddingVertical: 10,
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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.success,
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
  acceptButton: {
    backgroundColor: Colors.success,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  acceptButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
