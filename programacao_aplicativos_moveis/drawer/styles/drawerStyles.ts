import { StyleSheet } from "react-native";

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c0033",
  },
  header: {
    padding: 24,
    paddingTop: 40, // Espaço extra para a status bar do celular
    borderBottomWidth: 1,
    borderBottomColor: "#6d0e74",
    backgroundColor: "#2c0033",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20, // Espaço antes de começar os itens do menu
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 24,
    gap: 16, // Dá o espaçamento perfeito entre o ícone e o texto
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#6d0e74",
    backgroundColor: "#2c0033",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  leave: {
    color: "#ff0000",
    fontSize: 18,
    fontWeight: "700",
  },
});
// #6d0e74
// #5d0b64
// #4d0754
// #3c0443
// #2c0033
