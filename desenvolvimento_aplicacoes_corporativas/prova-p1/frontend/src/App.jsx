// Roteador principal: define rotas públicas, protegidas e o layout base.
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

// --- IMPORTE AS PÁGINAS AQUI ---
import Register from "./pages/Register";
import Events from "./pages/Events"; // Você já tem este arquivo

// (Opcional) Fallback simples para rotas inexistentes
function NotFound() {
  return (
    <main className="container">
      <h1>404 — Página não encontrada</h1>
      <p>Verifique a URL ou volte para a Home.</p>
    </main>
  );
}
// Árvore de rotas aninhadas sob o RootLayout.
// O <Outlet /> do RootLayout renderiza os filhos declarados em "children".
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // públicas
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "forbidden", element: <Forbidden /> },

      // ...resto das suas rotas protegidas
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "register",
        element: (
          <RequireAuth>
            <RequireRole role="admin">
              <Register />
            </RequireRole>
          </RequireAuth>
        ),
      },
      {
        path: "admin",
        element: (
          <RequireAuth>
            <RequireRole role="admin">
              <Admin />
            </RequireRole>
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  // O AuthProvider envolve o Router para que todas as rotas
  // tenham acesso a user/token/login/logout via contexto.
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
