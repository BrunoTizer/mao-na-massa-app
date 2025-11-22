import { useLocalSearchParams, useRouter, Stack, Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Card from "@/src/components/Card";
import { Colors } from "@/constants/Colors";
import { getCursos } from "@/src/api/cursos";
import { Curso } from "@/src/types/cursos";
import { apiClient } from "@/src/api/apiClient";

const CursosPorAreaScreen = () => {
  const { areaId, areaNome } = useLocalSearchParams();
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCursos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/cursos?areaId=${areaId}`);
      setCursos(response.data.content);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCursos();
  }, [areaId]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: `Cursos - ${areaNome}` }} />

      <TouchableOpacity style={styles.refreshButton} onPress={loadCursos}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : cursos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum curso encontrado nesta área
          </Text>
        </View>
      ) : (
        <ScrollView>
          {cursos.map((item) => (
            <Link key={item.id} href={`/curso-details?id=${item.id}`} asChild>
              <TouchableOpacity>
                <Card>
                  <Text style={styles.title}>{item.titulo}</Text>
                  <Text style={styles.subtitle}>{item.nivel}</Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {item.descricao}
                  </Text>
                </Card>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CursosPorAreaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  refreshButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  refreshText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
});
