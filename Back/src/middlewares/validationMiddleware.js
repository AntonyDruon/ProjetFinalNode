import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("on rentre dans le middleware");
  const token = req.header("Authorization");
  console.log(token);
  // Vérifier s'il n'y a pas de token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token d'authentification manquant" });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'ID de l'utilisateur dans l'objet req pour les contrôleurs ultérieurs
    req.userId = decoded.id;

    next(); // Passer au prochain middleware ou à la route
  } catch (error) {
    console.error("Erreur de décodage du token : ", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default authMiddleware;
