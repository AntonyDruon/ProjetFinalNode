/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: `url(https://img.freepik.com/photos-gratuite/fond-design-texture-bois-chene_53876-143033.jpg?size=626&ext=jpg&ga=GA1.1.212159940.1701541924&semt=ais_user)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: `calc(100vh - 56px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card col-md-4 p-4">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
