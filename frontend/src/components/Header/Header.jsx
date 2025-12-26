import { useContext, useState } from "react";
import aroundLogo from "../../images/Vector-around.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Header({}) {
  const { currentUser, handleLogout } = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);

  const buttonClass = `header__close-button ${isOpen && "open"}`;
  const menuClass = `header__options ${isOpen && "open"}`;
  const logoClass = `header__logo-container ${isOpen && "open"}`;

  const handleOpenMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="header__container">
      <header className="header page__section">
        <div className={logoClass}>
          <img src={aroundLogo} alt="Around logo" className="header__logo" />
          <div className={buttonClass} onClick={handleOpenMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={menuClass}>
          <p className="header__useremail ">{currentUser?.email || ""}</p>

          <Link className="header__close-session" onClick={handleLogout}>
            Cerrar sesión
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
