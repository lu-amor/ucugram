import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../services/authService";

function LoginForm({ createAccount, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useLogin();

  const handleCreateAccountBtn = () => {
    // logica para crear cuenta here
    createAccount();
  };

  const validateEmail = (email) => {
    // para validar correos @ucu.edu.uy o @correo.ucu.edu.uy
    const ucuEmailPattern =
      /^[a-zA-Z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
    return ucuEmailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Por favor, ingresa un email válido de la UCU.");
      return;
    }
    const isLogged = await login(email, password);
    if (isLogged) {
      navigate("/myProfile"); // aca va a tener que estar la ruta del usuario
    } else {
      window.alert("Email o contraseña incorrecta")
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <buttona
          className={`${classes.delete} delete`}
          onClick={closeModal}
        ></buttona>
        <div className={classes.modalContainer}>
          <div className={classes.logoContainer}>
            <img src="/ucugram-logo.png" className={classes.logo} />
          </div>
          <div className={classes.logoContainer}>
            <img
              src="/ucugram-text-sinFondo.png"
              alt="logo"
              className={classes.isologo}
            />
          </div>
          <form onSubmit={handleSubmit} className={classes.modalContainer}>
            <div className={classes.field}>
              <label className="label">email</label>
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className={classes.field}>
              <label className="label">password</label>
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className={classes.buttonContainer}>
              <button className="button" id={classes.loginButton} type="submit">
                Login
              </button>
            </div>
          </form>
          <div className={classes.buttonContainer}>
            <button
              style={{ font: "12px arial", marginBottom: "10px" }}
              onClick={handleCreateAccountBtn}
            >
              Create account <strong>here</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
