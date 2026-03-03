import { Link } from "expo-router";
import { Text, View, Pressable, Animated } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -30,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  return (
    <View style={commonStyles.container}>
      <Animated.Text
        style={[
          commonStyles.errorCode,
          { transform: [{ translateY: bounceAnim }] },
        ]}
      >
        404
      </Animated.Text>{" "}
      <Text style={commonStyles.errorTitle}>Página não encontrada</Text>
      <Text style={commonStyles.errorSubtitle}>
        Desculpe, a página que você procura não existe.
      </Text>
      <Link href="/" asChild replace>
        <Pressable style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Voltar para home</Text>
        </Pressable>
      </Link>
    </View>
  );
}
