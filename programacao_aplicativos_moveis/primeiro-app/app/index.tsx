import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { commonStyles } from "./styles/commonStyles";

export default function Index() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>titulo.</Text>
      <Text style={commonStyles.subtitle}>não titulo.</Text>
      <Link href="/list" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a lista</Text>
        </Pressable>
      </Link>
      <Link href="/1" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a 1</Text>
        </Pressable>
      </Link>
      <Link href={{ pathname: "/[id]", params: { id: 2, color: "blue" } }} asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a 2</Text>
        </Pressable>
      </Link>
    </View>
  );
}
