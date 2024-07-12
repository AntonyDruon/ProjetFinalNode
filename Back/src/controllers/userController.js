import db from "../../db/db.js";

// Contrôleur pour gérer les actions sur les utilisateurs
const userController = {
  getUserById: (req, res) => {
    const userId = req.params.id;
    db.query(
      "SELECT * FROM utilisateurs WHERE id = ?",
      userId,
      (error, results) => {
        if (error) throw error;
        res.json(results[0]);
      }
    );
  },
};

export default userController;
