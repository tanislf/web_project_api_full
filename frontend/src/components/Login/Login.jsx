import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import aroundLogo from "../../images/Vector-around.png";

const Login = ({ handleLogin }) => {
  const naviagte = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const result = await handleLogin(data.email, data.password);

    if (result.success) {
      naviagte("/");
    } else {
      setErrorMessage("Credenciales incorrectas");
    }
  };

  return (
    <div className="login page__content">
      <div className="login__container">
        <div className="login__header">
          <img
            src={aroundLogo}
            alt="Around the U.S logo"
            className="login__logo"
          />

          <Link to="/signup" className="login__register-link">
            Regístrate
          </Link>
        </div>

        <h1 className="login__title"> Inicia sesión</h1>

        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="login__input"
            id="email"
            required
            name="email"
            value={data.email}
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            className="login__input"
            id="password"
            required
            name="password"
            value={data.password}
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />

          {errorMessage && <p className="login__error">{errorMessage}</p>}

          <div className="login__button-container">
            <button className="login__button" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="login__signup-container">
          <p className="login__signup">¿Aún no eres miembro?</p>
          <Link to="/signup" className="login__signup-link">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
