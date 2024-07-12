/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Meubles = () => {
  const [meubles, setMeubles] = useState([]);

  useEffect(() => {
    const fetchMeublesData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/meubles");
        setMeubles(response.data);
      } catch (error) {
        console.error("Error fetching meubles data:", error);
      }
    };

    fetchMeublesData();
  }, []);

  return (
    <div>
      <ul>
        {meubles.map((meuble) => (
          <li key={meuble.id}>{meuble.nom}</li>
        ))}
      </ul>
    </div>
  );
};

export default Meubles;
