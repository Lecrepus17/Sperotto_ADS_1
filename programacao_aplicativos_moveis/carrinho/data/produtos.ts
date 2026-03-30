export interface Produto {
  id: number;
  name: string;
  details: string;
}

export const produtos: Produto[] = [
  {
    id: 1,
    name: "Playstation 5",
    details: 'Console de última geração da Sony, com gráficos impressionantes e desempenho poderoso.',
  },
  {
    id: 2,
    name: "Xbox Series X",
    details: 'Console de última geração da Microsoft, com gráficos impressionantes e desempenho poderoso.',
  },
  {
    id: 3,
    name: "Nintendo Switch",
    details: 'Console de mesa da Nintendo, com gráficos impressionantes e desempenho poderoso.',
  },
  {
    id: 4,
    name: "MacBook Pro 16",
    details: 'Notebook Apple com chip M1 Pro, ideal para edição de vídeo e programação avançada.',
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    details: 'Smartphone topo de linha com câmera de 200MP e tela AMOLED de 120Hz.',
  },
  {
    id: 6,
    name: "Kindle Paperwhite",
    details: 'E-reader com iluminação embutida e bateria para semanas de uso.',
  },
  {
    id: 7,
    name: "Fone de Ouvido Sony WH-1000XM5",
    details: 'Headphone com cancelamento de ruído ativo e som de alta fidelidade.',
  },
  {
    id: 8,
    name: "GoPro HERO12",
    details: 'Câmera de ação resistente à água 4K com estabilização de imagem avançada.',
  },
]