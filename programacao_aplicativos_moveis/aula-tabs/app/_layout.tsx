import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="+not-found"
        options={{ title: "Página não encontrada" }}
      />
    </Stack>
  );
}
