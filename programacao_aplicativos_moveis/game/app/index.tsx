import { Redirect } from "expo-router";
import { Text, View, Pressable, TextInput } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useAuth } from "@/context/auth";
import { useState } from "react";

export default function Login() {
  const { isLogged, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  if (isLogged) return <Redirect href="/game" />;

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      login();
    } else {
      alert("Por favor, preencha email e senha");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Login.</Text>
      
      <TextInput
        style={commonStyles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={commonStyles.inputStyle}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      
      <Pressable style={commonStyles.button} onPress={handleLogin}>
        <Text style={commonStyles.buttonText}>Clique para logar</Text>
      </Pressable>
    </View>
  );
}