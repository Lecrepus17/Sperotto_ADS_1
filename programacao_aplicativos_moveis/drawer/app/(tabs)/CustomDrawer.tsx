import { View, Text } from "react-native";
import { commonStyles } from "../../styles/commonStyles";

export default function CustomDrawer() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Tela Customizada</Text>
    </View>
  );
}