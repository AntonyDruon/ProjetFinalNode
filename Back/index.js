import express from "express";
import cors from "cors";
import routes from "./src/routes/routes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
