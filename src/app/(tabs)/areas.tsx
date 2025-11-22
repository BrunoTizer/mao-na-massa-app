import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Card from "@/components/Card";
import { Colors } from "@/constants/Colors";
import { getAreas, deleteArea } from "@/src/api/areas";
import { Area } from "@/types/areas";

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

  const handleDelete = (id: string, nome: string) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja excluir a área "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteArea(id);
              loadData();
              Alert.alert("Sucesso", "Área excluída com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a área");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/area-form")}
        >
          <Text style={styles.createButtonText}>+ Nova Área</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {areas.map((item) => (
          <Card key={item.id}>
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/cursos-por-area?areaId=${item.id}&areaNome=${item.nome}`
                )
              }
            >
              <Text style={styles.title}>{item.nome}</Text>
              <Text style={styles.subtitle}>Ver cursos desta área →</Text>
            </TouchableOpacity>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push(`/area-form?id=${item.id}`)}
              >
                <Text style={styles.editButtonText}>✏️ Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id, item.nome)}
              >
                <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
              </TouchableOpacity>
            </View>
          </Card>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
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
    flex: 1,
    backgroundColor: Colors.danger,
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
  },
});
