import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AlertModal from "@/components/AlertModal";
import Loading from "@/components/Loading";
import CustomInput from "@/components/CustomInput";
import { Colors } from "@/constants/Colors";
import { getAula, createAula, updateAula } from "@/src/api/aulas";
import { NewAula } from "@/src/types/aulas";

const AulaFormScreen = () => {
  const { id, cursoId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [ordem, setOrdem] = useState("1");

  useEffect(() => {
    if (id) {
      loadAula();
    }
  }, [id]);

  const loadAula = async () => {
    try {
      const data = await getAula(id as string);
      setTitulo(data.titulo);
      setConteudo(data.conteudo);
      setOrdem(data.ordem.toString());
    } catch (error) {
      console.error("Erro ao carregar aula:", error);
      setError("Não foi possível carregar a aula");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!titulo || !conteudo || !ordem) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const aula: NewAula = {
        cursoId: cursoId as string,
        titulo,
        conteudo,
        ordem: parseInt(ordem),
      };

      if (id) {
        await updateAula(id as string, aula);
      } else {
        await createAula(aula);
      }

      router.back();
    } catch (error: any) {
      console.error("Erro ao salvar aula:", error);
      setError(error?.response?.data || "Erro ao salvar aula");
    }
  };

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: id ? "Editar Aula" : "Nova Aula" }}
      />

      <View style={styles.form}>
        <CustomInput
          label="Título *"
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Introdução à Segurança"
        />

        <CustomInput
          label="Ordem *"
          value={ordem}
          onChangeText={setOrdem}
          placeholder="Ex: 1"
          keyboardType="numeric"
        />

        <CustomInput
          label="Conteúdo *"
          value={conteudo}
          onChangeText={setConteudo}
          placeholder="Descreva o conteúdo da aula"
          multiline
          numberOfLines={8}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {id ? "Atualizar" : "Criar"} Aula
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

export default AulaFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 20,
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
