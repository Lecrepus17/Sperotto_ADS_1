import { Link, Redirect } from "expo-router";
import { Text, View, Pressable, FlatList } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useState, useEffect } from "react";

export default function Carregando({message="Carregando..."}) {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{message}</Text>
    </View>
  );
}
