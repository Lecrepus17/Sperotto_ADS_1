import { Link, Redirect } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { commonStyles } from "../../../segundo-app/app/styles/commonStyles";
import { useAuth } from "@/context/auth";

export default function Index() {
  const { logout } = useAuth();

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>titulo.</Text>
      <Pressable style={commonStyles.button} onPress={logout}>
        <Text style={commonStyles.buttonText}>Clique para deslogar</Text>
      </Pressable>
    </View>
  );
}
