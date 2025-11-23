import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Card from "@/components/Card";
import { Colors } from "@/constants/Colors";
import { getCursos } from "@/src/api/cursos";
import { Curso } from "@/src/types/cursos";

const CursosScreen = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  const loadData = async () => {
    try {
      const lista = await getCursos();
      setCursos(lista);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/curso-form" style={styles.link}>
        + Novo Curso
      </Link>

      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      <ScrollView>
        {cursos.map((item) => (
          <Link key={item.id} href={`/curso-detalhes?id=${item.id}`} asChild>
            <TouchableOpacity>
              <Card>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.subtitle}>
                  {item.area.nome} - {item.nivel}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.descricao}
                </Text>
              </Card>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default CursosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  link: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 15,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
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
