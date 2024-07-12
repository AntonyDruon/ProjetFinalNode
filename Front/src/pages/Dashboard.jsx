/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { Link } from "react-router-dom";

import Materials from "../components/Materials";
import Meubles from "../components/Meubles";
import Categories from "../components/Categories";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [materialData, setMaterialData] = useState([]);

  useEffect(() => {
    const fetchMaterialsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/materiaux");
        console.log("Materials data:", response.data);
        setMaterialData(response.data);
      } catch (error) {
        console.error("Error fetching materials data:", error);
      }
    };

    fetchMaterialsData();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <main
          role="main"
          className="main col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column"
        >
          <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Tableau de Bord</h1>
          </div>
          <p>Bienvenue dans votre tableau de bord.</p>
          <div>
            <h2>Liste des meubles</h2>
            <Meubles />
          </div>
          <div>
            <h2>Catégories de meubles</h2>
            <Categories />
          </div>
          <div>
            <h2>Matériaux par Entreprise</h2>
            <div className="materials-by-company">
              {materialData.map((material, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <p>{material.entreprise} :</p>
                  <Link to={`/material/${material.id}`}>
                    {material.material}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Composant Materials pour afficher les détails des matériaux */}
          <Materials />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
