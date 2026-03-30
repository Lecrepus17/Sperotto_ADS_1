export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
}

export const users: User[] = [
  { id: 1, email: "pedro.eduardo1777@gmail.com", password: "044551", name: "Pedro" },
  { id: 2, email: "maria.silva@gmail.com", password: "123456", name: "Maria" },
  { id: 3, email: "joao.pereira@gmail.com", password: "abc123", name: "João" },
  { id: 4, email: "ana.lima@gmail.com", password: "senha2026", name: "Ana" },
  { id: 5, email: "lucas.alves@gmail.com", password: "senhaForte!1", name: "Lucas" },
  { id: 6, email: "camila.ribeiro@gmail.com", password: "qwerty987", name: "Camila" },
  { id: 7, email: "bruno.santos@gmail.com", password: "100200300", name: "Bruno" },
  { id: 8, email: "larissa.costa@gmail.com", password: "blueSky22", name: "Larissa" },
];