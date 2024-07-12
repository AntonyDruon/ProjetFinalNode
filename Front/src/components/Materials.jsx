/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "../css/materials.css";

const Materials = () => {
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

  const chartData = {
    labels: materialData.map((material) => material.material),
    datasets: [
      {
        label: "Utilisation des matériaux",
        data: materialData.map(() => 1),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw.toFixed(2);
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
    },
  };

  return (
    <div className="materials-container">
      <h2>Utilisation des matériaux</h2>
      <div className="pie-chart-container">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default Materials;
