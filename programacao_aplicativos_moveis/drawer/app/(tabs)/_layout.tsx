import { Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import { CarrinhoProvider, useCarrinho } from "@/context/carrinho";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import CustomDrawer from "@/components/CustomDrawer";

function DrawerTab() {
  const { totalItens } = useCarrinho();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // cor do painel lateral
        drawerStyle: { backgroundColor: "#2c0033" },
        // cor dos itens ativos/inativos do drawer
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: "#bfbfbf",
        drawerLabelStyle: { fontSize: 16 },

        // cor da "barra" superior do header
        headerStyle: { backgroundColor: "#2c0033" },
        // cor do texto / ícones do header
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Drawer.Screen
        name="CustomDrawer"
        options={{
          title: "CustomDrawer",
          drawerLabel: "CustomDrawer",
          drawerIcon: (props) => (
            <Ionicons name="home" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="produtos"
        options={{
          title: "Produtos",
          drawerLabel: "Produtos",
          drawerIcon: (props) => (
            <Ionicons name="list" {...props} />
          ),
        }}
      />
      <Drawer.Screen
        name="carrinho"
        options={() => ({
          title: "Carrinho",
          drawerLabel: "Carrinho",
          drawerIcon: (props) => (
            // <View style={commonStyles.iconWithBadge}>
              <Ionicons  name="cart" {...props} />
            //   {totalItens > 0 && (
            //     <View style={commonStyles.badge}>
            //       <Text style={commonStyles.badgeText}>{totalItens}</Text>
            //     </View>
            //   )}
            // </View>
          ),
        })}
      />
    </Drawer>
  );
}

export default function TabsLayout() {
  // const { isLogged } = useAuth();
  // if (!isLogged) return <Redirect href="/" />;

  return (
    <CarrinhoProvider>
      <DrawerTab />
    </CarrinhoProvider>
  );
}
