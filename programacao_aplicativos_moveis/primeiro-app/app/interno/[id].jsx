import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { dados } from "../../dados";

export default function () {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = dados.find((d) => d.id === Number(id));
  if (!item) return <Redirect href="/interno" />;
  const voltar = () => {
    router.back();
  };

  return (
    <View style={[commonStyles.container]}>
      <Text style={commonStyles.subtitle}>{item?.uf}</Text>
      <Text style={commonStyles.subtitle}>{item?.cidade}</Text>
      <Pressable style={commonStyles.button} onPress={voltar}>
        <Text style={commonStyles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}
