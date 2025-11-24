import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const PerfilScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user.nome}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.value}>{user.cidade}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.badge}>{user.tipoUsuario}</Text>
        </View>

        {user.area && (
          <View style={styles.row}>
            <Text style={styles.label}>Área:</Text>
            <Text style={styles.value}>{user.area.nome}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  logoutButton: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  value: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PerfilScreen;
