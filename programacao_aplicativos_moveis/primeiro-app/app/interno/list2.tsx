import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { Link } from "expo-router";

export default function ListScreen() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>titulo.</Text>
      <Link href="/interno/list" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a lista</Text>
        </Pressable>
      </Link>
    </View>     
    
  );
}