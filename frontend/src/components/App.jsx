import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import Header from "./Header/Header.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import { authorize, register as registerUser } from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

import Popup from "./Main/components/Popup/Popup.jsx";
import EditProfile from "../components/Main/components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "../components/Main/components/Popup/Avatar/EditAvatar.jsx";
import NewCard from "../components/Main/components/Popup/NewCard/NewCard.jsx";
import RemoveCard from "../components/Main/components/Popup/RemoveCard/RemoveCard.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  console.log(cards);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setTokenState] = useState(null);

  const [popup, setPopup] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //Mantener la sesión al recargar la página
  useEffect(() => {
    const storedToken = getToken();
    if (!storedToken) return;

    setTokenState(storedToken);
    setIsLoggedIn(true);
  }, []);

  // Obtener la info del usuario y tarjetas iniciales + cunado hay una sesión
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        console.log(userData);
        setCurrentUser((prev) => ({
          ...userData,
          email: prev.email || userData.email || "",
        }));
        setCards(cardsData);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, [isLoggedIn, token]);

  //Sección de registro de usuario
  const handleRegistration = async ({ email, password }) => {
    try {
      await registerUser(email, password);

      setIsSuccess(true);
      setIsTooltipOpen(true);

      return { success: true };
    } catch (err) {
      setIsSuccess(false);
      setIsTooltipOpen(true);

      return { success: false };
    }
  };

  //Sección de inicio de sesión
  const handleLogin = async (email, password) => {
    try {
      const response = await authorize(email, password);

      setToken(response.token);
      setTokenState(response.token);
      setIsLoggedIn(true);

      // Guardar email en currentUser
      setCurrentUser((user) => ({
        ...user,
        email: email,
      }));

      return { success: true };
    } catch (err) {
      console.error("Error en login:", err);
      return { success: false };
    }
  };

  //cerrar sesión
  const handleLogout = () => {
    removeToken();
    setTokenState(null);
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
  };

  //Popups
  const openPopup = (popupName) => setPopup(popupName);
  const closePopup = () => setPopup(null);

  // Añadir una nueva tarjeta
  const handleNewCard = async (newCardData) => {
    try {
      const newCard = await api.createNewCard(newCardData);
      setCards([newCard, ...cards]);
    } catch (error) {
      console.error("Error al crear nueva tarjeta:", error);
    }
  };

  // Actualizar perfil de usuario
  const handleUpdateUser = async (profileData) => {
    try {
      const newUserData = await api.editProfile(profileData);
      setCurrentUser(newUserData);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // Actualizar avatar
  const handleUpdateAvatar = async (avatarData) => {
    try {
      const newAvatarData = await api.editProfileImage(avatarData);
      setCurrentUser(newAvatarData);
    } catch (error) {
      console.error("Error al actualizar el avatar de usuario:", error);
    }
  };

  // Dar y quitar like a la tarjeta
  const handleCardLike = async (card) => {
    try {
      const isLiked = card.likes.some(
        (id) => id.toString() === currentUser._id
      );
      await api.likeCardStatus(card._id, isLiked).then((updatedCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? updatedCard : c))
        );
      });
      // .catch((error) => console.error("Error al actualizar like:", error));
    } catch (err) {
      console.error("Error al actualizar like:", err);
    }
  };

  //Eliminar tarjeta
  const handleRemoveCard = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error(err);
    }
  };

  // popups de formularios
  const popups = {
    newCard: {
      title: "Nuevo lugar",
      children: <NewCard onAddCard={handleNewCard} onClose={closePopup} />,
    },
    editProfile: {
      title: "Editar Perfil",
      children: <EditProfile onClose={closePopup} />,
    },
    editAvatar: {
      title: "Editar Avatar",
      children: <EditAvatar onClose={closePopup} />,
    },
    removeCard: {
      title: "¿Estás seguro/a?",
      children: <RemoveCard onClose={closePopup} />,
    },
  };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          isLoggedIn,
          handleLogout,
        }}
      >
        {isLoggedIn && (
          <Header
            onEditProfile={() => openPopup("editProfile")}
            onEditAvatar={() => openPopup("editAvatar")}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="page__content">
                  <Main
                    cards={cards}
                    onAddCard={() => openPopup("newCard")}
                    onEditProfile={() => openPopup("editProfile")}
                    onEditAvatar={() => openPopup("editAvatar")}
                    onRemoveCard={handleRemoveCard}
                    onCardLike={handleCardLike}
                  />

                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous={true}>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous={true}>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={() => setIsTooltipOpen(false)}
          isSuccess={isSuccess}
        />

        {popup && (
          <Popup onClose={closePopup} title={popups[popup].title}>
            {popups[popup].children}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
