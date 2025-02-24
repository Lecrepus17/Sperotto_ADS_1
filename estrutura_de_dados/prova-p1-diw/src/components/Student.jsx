import React from "react";

const Student = ({ nome, nota }) => (
  <li>
    {nome} - Nota: {nota}
  </li>
);

export default Student;
