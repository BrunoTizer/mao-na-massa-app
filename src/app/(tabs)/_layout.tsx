import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="cursos"
        options={{
          tabBarIcon: () => <Ionicons name="book" size={24} />,
          headerTitle: "Cursos",
        }}
      />
      <Tabs.Screen
        name="areas"
        options={{
          tabBarIcon: () => <Ionicons name="grid" size={24} />,
          headerTitle: "Áreas",
        }}
      />
      <Tabs.Screen
        name="meus-cursos"
        options={{
          tabBarIcon: () => <Ionicons name="school" size={24} />,
          headerTitle: "Meus Cursos",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} />,
          headerTitle: "Perfil",
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          tabBarIcon: () => <Ionicons name="information-circle" size={24} />,
          headerTitle: "Sobre",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
