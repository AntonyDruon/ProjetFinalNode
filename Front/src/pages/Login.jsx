/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: `url(https://img.freepik.com/photos-gratuite/fond-design-texture-bois-chene_53876-143033.jpg?size=626&ext=jpg&ga=GA1.1.212159940.1701541924&semt=ais_user)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: `calc(100vh - 56px)`, // 56px est la hauteur estimée de la navbar
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
