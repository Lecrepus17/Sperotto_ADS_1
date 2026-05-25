import { useAuth } from "@/context/auth";
import { Text, View, TouchableOpacity } from "react-native";
import { drawerStyles } from "../styles/drawerStyles";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const { user } = useAuth();
  const activeRouteName = props.state.routeNames[props.state.index];
  // const links = [
  //   { name: 'CustomDrawer', label: 'Início', icon: <Ionicons name="home" size={24} color="white" /> },
  //   { name: 'produtos', label: 'Produtos', icon: <Ionicons name="list" size={24} color="white" /> },
  //   { name: 'carrinho', label: 'Carrinho', icon: <Ionicons name="cart" size={24} color="white" /> }
  // ];

  return (
    <View style={drawerStyles.container}>
      {/* Cabeçalho */}
      <View style={drawerStyles.header}>
        <Text style={drawerStyles.title}>Bem Vindo!</Text>
        <Text style={drawerStyles.inputStyle}>
          {user?.name ?? "Logue por favor"}
        </Text>
        <Text style={drawerStyles.inputStyle}>
          {user?.email ?? "Não tem email"}
        </Text>
      </View>

      {/* Área de Menus */}
      <View style={drawerStyles.menuContainer}>
        {props.state.routes.map((link: any) => {
          const options = props.descriptors[link.key].options;
          const isActive = link.name === activeRouteName;
          return (
            <TouchableOpacity
              key={options.name}
              style={drawerStyles.menuButton}
              onPress={() => props.navigation.navigate(link.name)}
            >
              <options.drawerIcon color={isActive ? "#ffffff" : "#bfbfbf"} />
              <Text style={[drawerStyles.menuText, { color: isActive ? "#ffffff" : "#bfbfbf" }]}>
                {options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
        {/* {links.map((link) => (
          <TouchableOpacity
            key={link.name}
            style={drawerStyles.menuButton}
            onPress={() => props.navigation.navigate(link.name)}
          >
            {link.icon}
            <Text style={drawerStyles.menuText}>{link.label}</Text>
          </TouchableOpacity>
        ))} */}
      </View>

      {/* Rodapé */}
      <View style={drawerStyles.footer}>
        <TouchableOpacity
          style={drawerStyles.footerButton}
          onPress={() => alert("logout")}
        >
          {/* Mudei a cor do ícone para vermelho para combinar com o texto Sair! */}
          <Ionicons name="log-out" size={24} color="#ff0000" />
          <Text style={drawerStyles.leave}>Sair!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
