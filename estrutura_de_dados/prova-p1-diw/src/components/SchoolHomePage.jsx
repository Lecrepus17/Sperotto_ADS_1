import React from "react";

const SchoolHomePage = () => {
  const handleClick = () => {
    alert("Bem-vindo ao sistema de gestão escolar!");
  };

  return (
    <div style={styles.container}>
      <h1>IFRS - Campus Bento Gonçalves</h1>
      <p>Bem-vindo ao sistema de gestão escolar do IFRS!</p>
      <button style={styles.button} onClick={handleClick}>
        Acessar Sistema
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "lightgray",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "lightgreen",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SchoolHomePage;
