const jwt = require("jsonwebtoken");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    // Usuário fictício
    if (email === "admin@ifrs.edu.br" && password === "123456") {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
      return res.json({ token });
    }

    if (email === "user@ifrs.edu.br" && password === "123456") {
      const token = jwt.sign(
        { email, role: "user" },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
      return res.json({ token });
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
  }
}

module.exports = AuthController;
