import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import { ColorProvider } from "@/context/color";

export default function TabsLayout() {
  const { isLogged } = useAuth(); // Simulação de estado de autenticação
  if (!isLogged) return <Redirect href="/" />;
  return (
    <ColorProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: "#2c0033",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveBackgroundColor: "#fff",
          tabBarInactiveTintColor: "#2c0033",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="game"
          options={{
            title: "Game",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="game-controller" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Configurações",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ColorProvider>
  );
}
