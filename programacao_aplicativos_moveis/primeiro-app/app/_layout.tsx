import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="list" options={{ title: "Lista" }} />
      <Stack.Screen name="list2" options={{ title: "Lista 2" }} />
      <Stack.Screen name="+not-found" options={{ title: "Página não encontrada" }} />
      <Stack.Screen name="/[id]" options={{ title: "detalhes" }} />
    </Stack>
  );
}
