/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MaterialDetail = () => {
  const { id } = useParams();
  const [materialDetail, setMaterialDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterialDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/materiaux/${id}`
        );
        console.log("Material detail:", response.data);
        setMaterialDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching material detail:", error);
        setLoading(false);
      }
    };

    fetchMaterialDetail();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!materialDetail) {
    return <p>Aucun détail trouvé pour ce matériau.</p>;
  }

  return (
    <div>
      <h2>Détails du Matériau</h2>
      <p>ID: {materialDetail.id}</p>
      <p>Matériau: {materialDetail.material}</p>
      <p>Entreprise: {materialDetail.entreprise}</p>
      <p>
        <strong>Description :</strong> {materialDetail.description}
      </p>
    </div>
  );
};

export default MaterialDetail;
