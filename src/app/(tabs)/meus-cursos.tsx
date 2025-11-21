import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

const MeusCursosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Cursos em Andamento</Text>
      <Text style={styles.subtitle}>
        Aqui você verá os cursos que está fazendo
      </Text>
    </View>
  );
};

export default MeusCursosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
