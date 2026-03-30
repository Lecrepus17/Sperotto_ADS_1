import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import { CarrinhoProvider, useCarrinho } from "@/context/carrinho";

function TabsWithBadge() {
  const { totalItens } = useCarrinho();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#2c0033",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveBackgroundColor: "#fff",
        tabBarInactiveTintColor: "#2c0033",
      }}
    >
      <Tabs.Screen
        name="produtos"
        options={{
          title: "Produtos",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: totalItens > 0 ? totalItens : undefined,
        }}
      />
    </Tabs>
  );
}

export default function TabsLayout() {
  const { isLogged } = useAuth();
  if (!isLogged) return <Redirect href="/" />;

  return (
    <CarrinhoProvider>
      <TabsWithBadge />
    </CarrinhoProvider>
  );
}
