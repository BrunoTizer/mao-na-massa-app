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
import { getServicos } from "@/src/api/servicos";
import { Servico } from "@/src/types/servicos";

const ServicosScreen = () => {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServicos = async () => {
    try {
      setLoading(true);
      const lista = await getServicos();
      setServicos(lista);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServicos();
  }, []);

  if (loading) {
    return <Loading message="Carregando serviços..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/servico-form")}
        >
          <Text style={styles.createButtonText}>+ Novo Serviço</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={loadServicos}>
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {servicos.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/servico-detalhes?id=${item.id}`)}
          >
            <Card>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.subtitle}>
                {item.profissional.usuario.nome} • {item.cidade}
              </Text>
              <Text style={styles.description}>{item.descricao}</Text>
              <Text style={styles.price}>
                R$ {item.preco.toFixed(2)}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServicosScreen;

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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.success,
  },
});
