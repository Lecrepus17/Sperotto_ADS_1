  import { StyleSheet } from "react-native";
  
  export const gameStyles = StyleSheet.create({
  board: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  symbol: {
    fontSize: 48,
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: "#2c0033",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});