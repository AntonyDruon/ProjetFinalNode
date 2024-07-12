import db from "../../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const authController = {
  // Méthode pour connecter un utilisateur
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // Vérifier si l'utilisateur existe dans la base de données
    db.query(
      "SELECT * FROM utilisateurs WHERE email = ?",
      email,
      async (error, results) => {
        if (error) {
          console.error(
            "Erreur lors de la recherche de l'utilisateur : ",
            error
          );
          return res.status(500).json({ message: "Erreur interne du serveur" });
        }
        console.log(results);
        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Email ou mot de passe incorrect" });
        }

        const user = results[0];

        const token = jwt.sign({ user }, process.env.JWT_SECRET);

        res
          .header("Authorization", `Bearer ${token}`)
          .json({ message: "Connexion réussie" });
      }
    );
  },
};

export default authController;
