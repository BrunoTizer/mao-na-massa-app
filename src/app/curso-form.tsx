import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomPicker from "@/components/CustomPicker";
import { Colors } from "@/constants/Colors";
import { getCurso, createCurso, updateCurso } from "@/src/api/cursos";
import { getAreas } from "@/src/api/areas";
import { Area } from "@/types/areas";

const CursoFormScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isEdit = !!id;

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [areaId, setAreaId] = useState("");
  const [nivel, setNivel] = useState("Iniciante");
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAreas = async () => {
    try {
      const lista = await getAreas();
      setAreas(lista);
      if (lista.length > 0 && !areaId) {
        setAreaId(lista[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar áreas:", error);
    }
  };

  const loadCurso = async () => {
    if (!isEdit) return;

    try {
      const curso = await getCurso(id as string);
      setTitulo(curso.titulo);
      setDescricao(curso.descricao);
      setAreaId(curso.area.id);
      setNivel(curso.nivel);
    } catch (error) {
      console.error("Erro ao carregar curso:", error);
      Alert.alert("Erro", "Não foi possível carregar o curso");
    }
  };

  const handleSubmit = async () => {
    if (!titulo.trim()) {
      Alert.alert("Erro", "Título é obrigatório");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Erro", "Descrição é obrigatória");
      return;
    }

    if (!areaId) {
      Alert.alert("Erro", "Área é obrigatória");
      return;
    }

    setLoading(true);

    try {
      const cursoData = {
        titulo,
        descricao,
        areaId,
        nivel,
      };

      if (isEdit) {
        await updateCurso(id as string, cursoData);
        Alert.alert("Sucesso", "Curso atualizado com sucesso");
      } else {
        await createCurso(cursoData);
        Alert.alert("Sucesso", "Curso criado com sucesso");
      }

      router.back();
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      Alert.alert("Erro", "Não foi possível salvar o curso");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAreas();
    loadCurso();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: isEdit ? "Editar Curso" : "Novo Curso" }}
      />

      <View style={styles.form}>
        <CustomInput
          label="Título *"
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Elétrica Residencial"
        />

        <CustomInput
          label="Descrição *"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva o curso..."
          multiline
          numberOfLines={4}
        />

        <CustomPicker
          label="Área *"
          selectedValue={areaId}
          onValueChange={setAreaId}
          items={areas.map((area) => ({
            label: area.nome,
            value: area.id,
          }))}
          placeholder="Selecione uma área"
        />

        <CustomPicker
          label="Nível *"
          selectedValue={nivel}
          onValueChange={setNivel}
          items={[
            { label: "Iniciante", value: "Iniciante" },
            { label: "Intermediário", value: "Intermediário" },
            { label: "Avançado", value: "Avançado" },
          ]}
          placeholder="Selecione o nível"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>
              {isEdit ? "Atualizar Curso" : "Criar Curso"}
            </Text>
          )}
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

export default CursoFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
