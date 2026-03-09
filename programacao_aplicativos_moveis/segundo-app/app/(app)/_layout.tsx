import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { isLogged } = useAuth(); // Simulação de estado de autenticação
  if (!isLogged) return <Redirect href='/login' />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="list" options={{ title: "Lista" }} />
    </Stack>
  );
}
