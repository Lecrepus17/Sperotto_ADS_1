import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../../../segundo-app/app/styles/commonStyles";
import { Link } from "expo-router";

export default function ListScreen() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>titulo.</Text>
      <Link href="/interno" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a home</Text>
        </Pressable>
      </Link>
      <Link href="/interno/list2" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a list2</Text>
        </Pressable>
      </Link>
    </View>     
    
  );
}