// src/routes/routes.js
import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/validationMiddleware.js";
import apiController from "../controllers/apiController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post(
  "/user/login",

  (req, res, next) => {
    console.log("Requête reçue dans /login");
    next();
  },
  authController.login
);
router.get(
  "/materiaux",

  (req, res, next) => {
    console.log("Requête reçue dans materiaux");
    next();
  },
  apiController.getMaterials
);
router.get(
  "/meubles",
  (req, res, next) => {
    console.log("Requête reçue dans /meubles");
    next();
  },
  apiController.getMeubles
);

router.get(
  "/meubles/:id",
  (req, res, next) => {
    console.log("Requête reçue dans /meubles/:id");
    next();
  },
  apiController.getMeubleById
);
router.get(
  "/materiaux/:id",
  (req, res, next) => {
    console.log("Requête reçue dans /materiaux/:id");
    next();
  },
  apiController.getMaterialById
);

router.get(
  "/categories",
  (req, res, next) => {
    console.log("Requête reçue dans /categories");
    next();
  },
  apiController.getCategories
);

export default router;
