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
import { Picker } from "@react-native-picker/picker";
import AlertModal from "@/components/AlertModal";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import { getProfissional, createProfissional, updateProfissional } from "@/src/api/profissionais";
import { getUsuarios } from "@/src/api/usuarios";
import { Usuario } from "@/src/types/usuarios";

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
      const profissional = {
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
      setError(error?.response?.data || "Erro ao salvar profissional");
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
        <Text style={styles.label}>Usuário *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={usuarioId}
            onValueChange={setUsuarioId}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um usuário" value="" />
            {usuarios.map((usuario) => (
              <Picker.Item
                key={usuario.id}
                label={`${usuario.nome} (${usuario.email})`}
                value={usuario.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva sua experiência profissional"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Avaliação Média</Text>
        <TextInput
          style={styles.input}
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
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.background,
  },
  picker: {
    height: 50,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  saveButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
