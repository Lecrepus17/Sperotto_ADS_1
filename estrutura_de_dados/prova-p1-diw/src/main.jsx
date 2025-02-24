import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SchoolHomePage from "./components/SchoolHomePage";
import Classroom from "./components/Classroom";
import StudentList from "./components/StudentList";
import Teacher from "./components/Teacher";
const turma = {
  nomeDaTurma: "Turma A",
  estudantes: [
    { nome: "João", nota: 8 },
    { nome: "Maria", nota: 9 },
    { nome: "Carlos", nota: 7 },
  ],
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SchoolHomePage />
    <Classroom nomeDaTurma={turma.nomeDaTurma} estudantes={turma.estudantes} />
    <StudentList />
    <Teacher />
  </StrictMode>
);
