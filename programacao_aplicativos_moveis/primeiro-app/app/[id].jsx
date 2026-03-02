import { Pressable, Text, View } from "react-native";
import { commonStyles } from "./styles/commonStyles";
import { Link, useLocalSearchParams } from "expo-router";

export default function () {
  const { id, color } = useLocalSearchParams(); // <– pega também o color
  const idNumber = id;
  const backgroundColor = color;

  return (
    <View style={[commonStyles.container, { backgroundColor }]}>
      <Text style={commonStyles.title}>{idNumber}</Text>
      <Link href="/" asChild>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para a home</Text>
        </Pressable>
      </Link>
    </View>
  );
}
