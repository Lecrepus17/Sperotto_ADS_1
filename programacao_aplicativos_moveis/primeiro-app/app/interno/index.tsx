import { Link, useRouter } from "expo-router";
import { Text, View, Pressable, Button } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { dados } from "../../dados";
import { Background } from "@react-navigation/elements";

interface Dado {
  id: number;
  uf: string;
  cidade: string;
}
export default function Index() {
  const router = useRouter();
  const onPress = (item: Dado) => {
    router.push({ pathname: "/interno/[id]", params: { id: item.id, backgroundColor: "blue" } });
    // router.replace("/10");
  };
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>titulo.</Text>
      <Text style={commonStyles.subtitle}>não titulo.</Text>
      <Link href="/interno/list" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a lista</Text>
        </Pressable>
      </Link>
      <Link href="/interno/1" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a 1</Text>
        </Pressable>
      </Link>
      <Link
        href={{ pathname: "/interno/[id]", params: { id: 2, color: "blue" } }}
        asChild
      >
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a 2</Text>
        </Pressable>
      </Link>

      {dados.map((item) => (
          <Pressable key={item.id} style={commonStyles.button} onPress={() => onPress(item)}>
            <Text style={commonStyles.buttonText}>Ir para a {item.uf}</Text>
          </Pressable>
      ))}
      {/* <Button title="Ir para a 1" onPress={onPress} /> */}
    </View>
  );
}
