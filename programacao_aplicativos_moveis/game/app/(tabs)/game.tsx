import { Link, Redirect } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { gameStyles } from "../../styles/gameStyles";
import { useState } from "react";
import { useColor } from "@/context/color";

// Remova o objeto colors local, pois usaremos o do contexto

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  // Use o hook para acessar as cores do contexto
  const { colorX, colorO } = useColor();

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      style={gameStyles.square}
      onPress={() => handlePress(index)}
    >
      <Text style={[gameStyles.symbol, { color: board[index] === "X" ? colorX : colorO }]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  const winner = calculateWinner(board);
  const status = winner ? `Vencedor: ${winner}` : `Próximo: ${isXNext ? "X" : "O"}`;

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.centeredContent}>
        <Text style={commonStyles.title}>{status}</Text>
        <View style={gameStyles.board}>
          {Array(3).fill(null).map((_, row) => (
            <View key={row} style={gameStyles.row}>
              {Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
            </View>
          ))}
        </View>
        <TouchableOpacity style={gameStyles.resetButton} onPress={resetGame}>
          <Text style={gameStyles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}