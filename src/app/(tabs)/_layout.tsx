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
        name="profissionais"
        options={{
          tabBarIcon: () => <Ionicons name="people" size={24} />,
          headerTitle: "Profissionais",
        }}
      />
      <Tabs.Screen
        name="servicos"
        options={{
          tabBarIcon: () => <Ionicons name="briefcase" size={24} />,
          headerTitle: "Serviços",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
