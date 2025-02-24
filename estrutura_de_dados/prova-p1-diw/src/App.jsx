import React from "react";
import SchoolHomePage from "./components/SchoolHomePage";
import Classroom from "./components/Classroom";
import StudentList from "./components/StudentList";
import Teacher from "./components/Teacher";
// const turma = {
//   nomeDaTurma: "Turma A",
//   estudantes: [
//     { nome: "João", nota: 8 },
//     { nome: "Maria", nota: 9 },
//     { nome: "Carlos", nota: 7 },
//   ],
// };
const App = () => {
  return (
    <div>
      {/* <SchoolHomePage /> */}
      {/* <Classroom nomeDaTurma={turma.nomeDaTurma} estudantes={turma.estudantes} /> */}
      {/* <StudentList /> */}
      <Teacher />
    </div>
  );
};

export default App;
