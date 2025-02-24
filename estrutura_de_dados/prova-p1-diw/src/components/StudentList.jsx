import React, { useState, useEffect } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = [
      { nome: "João", nota: 8 },
      { nome: "Maria", nota: 9 },
      { nome: "Carlos", nota: 7 },
      { nome: "Ana", nota: 10 },
    ];
    setStudents(data);
  }, []);

  const addStudent = () => {
    setStudents([...students, { nome: "Pedro", nota: 9 }]);
  };

  return (
    <div>
      <h1>Lista de Estudantes</h1>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.nome} - Nota: {student.nota}
          </li>
        ))}
      </ul>
      <button onClick={addStudent}>Adicionar Estudante Pedro</button>
    </div>
  );
};

export default StudentList;
