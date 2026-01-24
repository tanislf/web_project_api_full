import { Link } from "react-router-dom";
import { useState } from "react";
import aroundLogo from "../../images/Vector-around.png";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const result = await handleRegistration(data);
    if (result?.success) {
      setData({ email: "", password: "" });
    }
  };

  return (
    <div className="register page__content">
      <div className="register__container">
        <div className="register__header">
          <img
            src={aroundLogo}
            alt="Around the U.S logo"
            className="register__logo"
          />

          <Link to="/signin" className="register__login-link">
            Iniciar sesión
          </Link>
        </div>

        <h1 className="register__title"> Registrate</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="register__input"
            id="email"
            name="email"
            type="email"
            value={data.email}
            placeholder="Correo electrónico"
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            className="register__input"
            id="password"
            name="password"
            type="password"
            value={data.password}
            placeholder="Contraseña"
            onChange={handleChange}
          />

          <div className="register__button-container">
            <button className="register__button" type="submit">
              Registrarse pruebaaa
            </button>
          </div>
        </form>

        <div className="register__signup-container">
          <p className="register__signup">¿Ya eres miembro?</p>
          <Link to="/signin" className="register__signup-link">
            ¡Inicia sesión aquí!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
