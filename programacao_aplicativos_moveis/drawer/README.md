# Drawer App

Este projeto é um app Expo com navegação em drawer e autenticação simples usando contexto.

## Como usar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o app:

   ```bash
   npx expo start
   ```

3. Use o terminal do Expo para abrir em um emulador Android/iOS ou no Expo Go.

## Estrutura principal

- `app/index.tsx` — tela de login
- `app/_layout.tsx` — `AuthProvider` global e configuração de navegação
- `app/(tabs)/_layout.tsx` — layout do drawer
- `app/(tabs)/produtos.tsx` — página de produtos
- `app/(tabs)/carrinho.tsx` — página do carrinho
- `app/(tabs)/CustomDrawer.tsx` — drawer personalizado com dados do usuário
- `context/auth.tsx` — contexto de autenticação (`useAuth`)

## Fluxo do app

- O usuário faz login em `app/index.tsx`
- Se o login for bem-sucedido, a navegação redireciona para as telas do drawer
- O `AuthProvider` mantém `isLogged`, `user`, `login()` e `logout()` disponíveis para todos os componentes
- Dentro de `CustomDrawer` você pode acessar o usuário com `const { user } = useAuth();`

## Rotas do drawer

- `/produtos` — lista de produtos
- `/carrinho` — carrinho de compras

## Dicas úteis

- Se `user` aparecer como `null`, verifique se o login foi feito com sucesso.
- Em componentes, use:

  ```tsx
  import { useAuth } from '@/context/auth';

  const { user, logout } = useAuth();
  ```

- Se o drawer não abrir ou a rota não existir, confira os nomes dos arquivos em `app/(tabs)`.

## Scripts disponíveis

- `npm start` — inicia o Metro e o Expo Local
- `npm run android` — inicia no Android (se tiver emulador ou dispositivo conectado)
- `npm run ios` — inicia no iOS (se tiver simulator disponível)
- `npm run web` — inicia no navegador
- `npm run lint` — roda o ESLint

## Dependências principais

- `expo`
- `expo-router`
- `@react-navigation/drawer`
- `@react-navigation/native`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `@expo/vector-icons`

## Observações

Este app usa routing de arquivo do Expo Router e um drawer personalizado. Qualquer componente abaixo de `AuthProvider` pode acessar o usuário logado através do hook `useAuth()`.
