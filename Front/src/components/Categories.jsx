/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <div>
      <ul>
        {categories.map((categorie) => (
          <li key={categorie.id}>{categorie.nom}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
