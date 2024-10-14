import React, { useState, useCallback } from "react";

const Teacher = React.memo(({ nome, disciplina }) => {
  console.log("Renderizado " + nome);
  return (
    <div>
      <h3>{nome}</h3>
      <p>Disciplina: {disciplina}</p>
    </div>
  );
});

const School = () => {
  const [teacher, setTeacher] = useState({
    nome: "Prof. Carlos",
    disciplina: "Matemática",
  });
  const [schoolName, setSchoolName] = useState("Escola ABC");

  const toggleDiscipline = useCallback(() => {
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      disciplina:
        prevTeacher.disciplina === "Matemática" ? "Física" : "Matemática",
    }));
  }, []);

  const toggleSchoolName = useCallback(() => {
    setSchoolName((prevName) =>
      prevName === "Escola ABC" ? "Escola XYZ" : "Escola ABC"
    );
  }, []);

  return (
    <div>
      <h1>{schoolName}</h1>
      <Teacher nome={teacher.nome} disciplina={teacher.disciplina} />
      <button onClick={toggleDiscipline}>
        Alterar Disciplina do Professor
      </button>
      <button onClick={toggleSchoolName}>Alterar Nome da Escola</button>
    </div>
  );
};

export default School;
