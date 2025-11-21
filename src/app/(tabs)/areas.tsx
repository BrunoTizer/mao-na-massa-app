import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Card from "@/src/components/Card";
import { Colors } from "@/constants/Colors";
import { getAreas } from "@/src/api/areas";
import { Area } from "@/src/types/areas";

const AreasScreen = () => {
  const router = useRouter();
  const [areas, setAreas] = useState<Area[]>([]);

  const loadData = async () => {
    try {
      const lista = await getAreas();
      setAreas(lista);
    } catch (error) {
      console.error("Erro ao carregar áreas:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      <ScrollView>
        {areas.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/cursos-por-area?areaId=${item.id}&areaNome=${item.nome}`)}
          >
            <Card>
              <Text style={styles.title}>{item.nome}</Text>
              <Text style={styles.subtitle}>Ver cursos desta área →</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AreasScreen;

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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primary,
  },
});
