import { Link, Redirect } from "expo-router";
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useState, useEffect } from "react";
import Carregando from "../../components/Carregando";
import { useAuth } from "@/context/auth";
import { useColor } from "@/context/color";

export default function Settings() {
  const { logout } = useAuth();
  const { colorX, colorO, setColorX, setColorO } = useColor();
  const [tempColorX, setTempColorX] = useState(colorX);
  const [tempColorO, setTempColorO] = useState(colorO);

  const colorOptions = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF",
    "#000000",
  ];

  const handleSaveColors = () => {
    setColorX(tempColorX);
    setColorO(tempColorO);
    alert("Cores salvas!");
  };

  const renderColorOption = (color: string, isForX: boolean) => (
    <TouchableOpacity
      key={color}
      style={{
        width: 50,
        height: 50,
        backgroundColor: color,
        margin: 5,
        borderRadius: 25,
        borderWidth: (isForX ? tempColorX : tempColorO) === color ? 3 : 1,
        borderColor: "#fff",
      }}
      onPress={() => {
        if (isForX) setTempColorX(color);
        else setTempColorO(color);
      }}
    />
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Configurações</Text>

      <Text style={commonStyles.subtitle}>Cor do X</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {colorOptions.map((color) => renderColorOption(color, true))}
      </View>
      {/* <TextInput
        style={commonStyles.inputStyle}
        placeholder="Ex: #FF0000"
        value={tempColorX}
        onChangeText={setTempColorX}
      /> */}

      <Text style={commonStyles.subtitle}>Cor do O</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {colorOptions.map((color) => renderColorOption(color, false))}
      </View>
      {/* <TextInput
        style={commonStyles.inputStyle}
        placeholder="Ex: #0000FF"
        value={tempColorO}
        onChangeText={setTempColorO}
      /> */}

      <Pressable style={commonStyles.button} onPress={handleSaveColors}>
        <Text style={commonStyles.buttonText}>Salvar Cores</Text>
      </Pressable>

      <Pressable style={commonStyles.button} onPress={logout}>
        <Text style={commonStyles.buttonText}>Deslogar</Text>
      </Pressable>
    </View>
  );
}
