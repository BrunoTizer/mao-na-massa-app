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
    </Tabs>
  );
};

export default TabsLayout;
