export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
}

export const users: User[] = [
  {
    id: 1,
    email: "pedro.eduardo1777@gmail.com",
    password: "044551",
    name: "Pedro Sperotto",
    avatar: "https://img-global.vgswap.com/resized/product_background/202206/XGxFdFPXHBRtx3n2Pf55g5PZ1H7QVXo6qzGW9Uw3_jpg_1920x620.webp",
  },
  { id: 2, email: "maria.silva@gmail.com", password: "123456", name: "Maria" },
  {
    id: 3,
    email: "joao.pereira@gmail.com",
    password: "abc123",
    name: "João",
    avatar: "https://example.com/avatar3.jpg",
  },
  {
    id: 4,
    email: "ana.lima@gmail.com",
    password: "senha2026",
    name: "Ana",
    avatar: "https://example.com/avatar4.jpg",
  },
  {
    id: 5,
    email: "lucas.alves@gmail.com",
    password: "senhaForte!1",
    name: "Lucas",
  },
  {
    id: 6,
    email: "camila.ribeiro@gmail.com",
    password: "qwerty987",
    name: "Camila",
  },
  {
    id: 7,
    email: "bruno.santos@gmail.com",
    password: "100200300",
    name: "Bruno",
  },
  {
    id: 8,
    email: "larissa.costa@gmail.com",
    password: "blueSky22",
    name: "Larissa",
  },
];
