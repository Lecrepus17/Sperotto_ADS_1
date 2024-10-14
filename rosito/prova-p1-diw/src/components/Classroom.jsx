import React from "react";
import Student from "./Student";

const Classroom = ({ nomeDaTurma, estudantes }) => (
  <div>
    <h2>{nomeDaTurma}</h2>
    <p>Quantidade de estudantes: {estudantes.length}</p>
    <ul>
      {estudantes.map((student, index) => (
        <Student key={index} nome={student.nome} nota={student.nota} />
      ))}
    </ul>
  </div>
);

export default Classroom;
