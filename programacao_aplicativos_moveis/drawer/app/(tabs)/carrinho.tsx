import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useCarrinho } from "@/context/carrinho";
import { Produto } from "../../data/produtos";
import { useState, useMemo } from "react";

export default function Carrinho() {
  const { itens, removerProduto } = useCarrinho();

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
          backgroundColor: "#ff5a5a",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => removerProduto(item.id)}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>✖️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Carrinho ({itens.length})</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        // ListEmptyComponent={<Text style={commonStyles.subtitle}>Carrinho vazio</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}