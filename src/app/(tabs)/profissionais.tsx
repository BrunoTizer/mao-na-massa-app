import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import { getProfissionais } from "@/src/api/profissionais";
import { Profissional } from "@/src/types/profissionais";

const ProfissionaisScreen = () => {
  const router = useRouter();
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfissionais = async () => {
    try {
      setLoading(true);
      const lista = await getProfissionais();
      setProfissionais(lista);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfissionais();
  }, []);

  if (loading) {
    return <Loading message="Carregando profissionais..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/profissional-form")}
        >
          <Text style={styles.createButtonText}>+ Novo Profissional</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={loadProfissionais}>
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {profissionais.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/profissional-detalhes?id=${item.id}`)}
          >
            <Card>
              <Text style={styles.title}>{item.usuario.nome}</Text>
              <Text style={styles.subtitle}>{item.usuario.area.nome}</Text>
              <Text style={styles.description}>{item.descricao}</Text>
              <View style={styles.info}>
                <Text style={styles.rating}>⭐ {item.avaliacaoMedia.toFixed(1)}</Text>
                <Text style={item.disponivel ? styles.available : styles.unavailable}>
                  {item.disponivel ? "✅ Disponível" : "⏸️ Indisponível"}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfissionaisScreen;

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
    color: Colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.warning,
  },
  available: {
    fontSize: 14,
    color: Colors.success,
  },
  unavailable: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.5,
  },
});
