import { Redirect } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { commonStyles } from "../../../segundo-app/app/styles/commonStyles";
import { useAuth } from "@/context/auth";

export default function Login() {
  const { isLogged, login } = useAuth();
  
  if (isLogged) return <Redirect href="/" />;

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Login.</Text>
      <Pressable style={commonStyles.button} onPress={login}>
        <Text style={commonStyles.buttonText}>Clique para logar</Text>
      </Pressable>
    </View>
  );
}
