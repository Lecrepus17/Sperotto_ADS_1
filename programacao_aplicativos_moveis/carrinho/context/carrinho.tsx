import { createContext, useContext, useState, ReactNode } from "react";
import { Produto } from "../data/produtos";

interface CarrinhoContextData {
  itens: Produto[];
  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
}

const Context = createContext<CarrinhoContextData>({} as CarrinhoContextData);

export function useCarrinho() {
  return useContext(Context);
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<Produto[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setItens((prev) => {
      if (prev.some((item) => item.id === produto.id)) {
        return prev; // já existe, não adiciona de novo
      }
      return [...prev, produto];
    });
  };

  const removerProduto = (id: number) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.length;

  return (
    <Context.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        limparCarrinho,
        totalItens,
      }}
    >
      {children}
    </Context.Provider>
  );
}
