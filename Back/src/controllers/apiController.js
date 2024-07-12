import db from "../../db/db.js";

const apiController = {
  getMaterials: async (req, res) => {
    try {
      const query = `
        SELECT mp.id, mp.nom AS material, e.nom AS entreprise
        FROM matieres_premieres mp
        JOIN entreprises e ON mp.entreprise_id = e.id
      `;

      const results = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      console.log("Results from database:", results);

      if (!results || results.length === 0) {
        return res.status(404).json({ message: "No materials found" });
      }

      const formattedResults = results.map((result) => ({
        id: result.id,
        material: result.material,
        entreprise: result.entreprise,
      }));

      console.log("Formatted results:", formattedResults);

      res.json(formattedResults);
    } catch (error) {
      console.error("Error fetching materials:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getMaterialById: async (req, res) => {
    try {
      const materialId = req.params.id;
      console.log("Material ID:", materialId);

      const query = `
       SELECT mp.id, mp.nom AS material, e.nom AS entreprise_nom, mp.Description, mp.entreprise_id
       FROM matieres_premieres mp
      JOIN entreprises e ON mp.entreprise_id = e.id
      WHERE mp.id = ?

      `;

      db.query(query, [materialId], (error, results) => {
        if (error) {
          console.error("Error fetching material:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Material not found" });
        }
        console.log("Results:", results);
        const formattedMaterial = {
          id: results[0].id,
          material: results[0].material,
          entreprise: results[0].entreprise_nom,
          description: results[0].Description,
        };

        console.log("Formatted material:", formattedMaterial);
        res.json(formattedMaterial);
      });
    } catch (error) {
      console.error("Error in getMaterialById:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getMeubles: async (req, res) => {
    try {
      const query = "SELECT * FROM meubles";
      const results = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getMeubleById: async (req, res) => {
    try {
      const meubleQuery = "SELECT * FROM meubles WHERE id = ?";
      const materialsQuery = `
        SELECT mp.*
        FROM meubles_matieres mm
        JOIN matieres_premieres mp ON mm.matiere_id = mp.id
        WHERE mm.meuble_id = ?
      `;

      const meuble = await new Promise((resolve, reject) => {
        db.query(meubleQuery, [req.params.id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      if (meuble.length === 0) {
        return res.status(404).json({ message: "Meuble non trouvé" });
      }

      const materials = await new Promise((resolve, reject) => {
        db.query(materialsQuery, [req.params.id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      res.json({ ...meuble[0], materials });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getCategories: async (req, res) => {
    try {
      const query = "SELECT * FROM categories";
      const results = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default apiController;
