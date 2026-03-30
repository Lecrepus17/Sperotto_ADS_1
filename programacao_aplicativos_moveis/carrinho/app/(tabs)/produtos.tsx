import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useCarrinho } from "@/context/carrinho";
import { produtos, Produto } from "../../data/produtos";

export default function Produtos() {
  const { adicionarProduto } = useCarrinho();

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={[commonStyles.card, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={commonStyles.cardTitle}>{item.name}</Text>
        <Text style={commonStyles.cardText}>{item.details}</Text>
      </View>

      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => adicionarProduto(item)}
      >
        <Text style={{ color: "#2c0033", fontWeight: "700", fontSize: 18 }}>➕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}