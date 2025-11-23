import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "@/components/AlertModal";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import { getServico, createServico, updateServico } from "@/src/api/servicos";
import { getProfissionais } from "@/src/api/profissionais";
import { Profissional } from "@/src/types/profissionais";

const ServicoFormScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [error, setError] = useState("");

  const [profissionalId, setProfissionalId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    loadProfissionais();
    if (id) {
      loadServico();
    }
  }, [id]);

  const loadProfissionais = async () => {
    try {
      const lista = await getProfissionais();
      setProfissionais(lista);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
    }
  };

  const loadServico = async () => {
    try {
      const data = await getServico(id as string);
      setProfissionalId(data.profissional.id);
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setCidade(data.cidade);
      setPreco(data.preco.toString());
    } catch (error) {
      console.error("Erro ao carregar serviço:", error);
      setError("Não foi possível carregar o serviço");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profissionalId || !titulo || !descricao || !cidade || !preco) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const servico = {
        profissionalId,
        titulo,
        descricao,
        cidade,
        preco: parseFloat(preco),
      };

      if (id) {
        await updateServico(id as string, servico);
      } else {
        await createServico(servico);
      }

      router.back();
    } catch (error: any) {
      console.error("Erro ao salvar serviço:", error);
      setError(error?.response?.data || "Erro ao salvar serviço");
    }
  };

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: id ? "Editar Serviço" : "Novo Serviço" }}
      />

      <View style={styles.form}>
        <Text style={styles.label}>Profissional *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={profissionalId}
            onValueChange={setProfissionalId}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um profissional" value="" />
            {profissionais.map((prof) => (
              <Picker.Item
                key={prof.id}
                label={`${prof.usuario.nome} - ${prof.usuario.area.nome}`}
                value={prof.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Instalação Elétrica Residencial"
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva o serviço oferecido"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Cidade *</Text>
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          placeholder="Ex: São Paulo"
        />

        <Text style={styles.label}>Preço (R$) *</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco}
          placeholder="Ex: 150.00"
          keyboardType="decimal-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {id ? "Atualizar" : "Criar"} Serviço
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

export default ServicoFormScreen;

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
