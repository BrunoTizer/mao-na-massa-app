import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import AlertModal from "@/components/AlertModal";
import Loading from "@/components/Loading";
import CustomInput from "@/components/CustomInput";
import CustomPicker from "@/components/CustomPicker";
import { Colors } from "@/constants/Colors";
import { getProfissional, createProfissional, updateProfissional } from "@/src/api/profissionais";
import { getUsuarios } from "@/src/api/usuarios";
import { Usuario } from "@/src/types/usuarios";
import { NewProfissional } from "@/src/types/profissionais";
import { getErrorMessage } from "@/src/utils/errorHandler";

const ProfissionalFormScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");

  const [usuarioId, setUsuarioId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [avaliacaoMedia, setAvaliacaoMedia] = useState("5.0");
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    loadUsuarios();
    if (id) {
      loadProfissional();
    }
  }, [id]);

  const loadUsuarios = async () => {
    try {
      const lista = await getUsuarios();
      setUsuarios(lista);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const loadProfissional = async () => {
    try {
      const data = await getProfissional(id as string);
      setUsuarioId(data.usuario.id);
      setDescricao(data.descricao);
      setAvaliacaoMedia(data.avaliacaoMedia.toString());
      setDisponivel(data.disponivel);
    } catch (error) {
      console.error("Erro ao carregar profissional:", error);
      setError("Não foi possível carregar o profissional");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!usuarioId || !descricao) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const profissional: NewProfissional = {
        usuarioId,
        descricao,
        avaliacaoMedia: parseFloat(avaliacaoMedia),
        disponivel,
      };

      if (id) {
        await updateProfissional(id as string, profissional);
      } else {
        await createProfissional(profissional);
      }

      router.back();
    } catch (error: any) {
      console.error("Erro ao salvar profissional:", error);
      setError(getErrorMessage(error, "Erro ao salvar profissional"));
    }
  };

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: id ? "Editar Profissional" : "Novo Profissional" }}
      />

      <View style={styles.form}>
        <CustomPicker
          label="Usuário *"
          selectedValue={usuarioId}
          onValueChange={setUsuarioId}
          items={usuarios.map((usuario) => ({
            label: `${usuario.nome} (${usuario.email})`,
            value: usuario.id,
          }))}
          placeholder="Selecione um usuário"
        />

        <CustomInput
          label="Descrição *"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva sua experiência profissional"
          multiline
          numberOfLines={4}
        />

        <CustomInput
          label="Avaliação Média"
          value={avaliacaoMedia}
          onChangeText={setAvaliacaoMedia}
          placeholder="5.0"
          keyboardType="decimal-pad"
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Disponível</Text>
          <Switch
            value={disponivel}
            onValueChange={setDisponivel}
            trackColor={{ false: Colors.text, true: Colors.success }}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {id ? "Atualizar" : "Criar"} Profissional
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

export default ProfissionalFormScreen;

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
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
