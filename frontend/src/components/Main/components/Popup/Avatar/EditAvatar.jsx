import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar(props) {
  const { onClose } = props;
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);

  //variables de estado para el avatar del perfil
  const [avatar, setAvatar] = useState(currentUser.avatar);

  //actualiza avatar cuando cambie la entrada
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  //actualiza la info del formulario
  const handleSubmitAvatar = async (evt) => {
    evt.preventDefault();

    try {
      await handleUpdateAvatar({ avatar });
      onClose();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <form
      className="popup-profile__form"
      id="profile-avatar-form"
      name="profile-avatar-form"
      noValidate
      onSubmit={handleSubmitAvatar}
    >
      <fieldset className="popup-profile__form-fieldset">
        <label htmlFor="profile-avatar">
          <input
            className=" popup-profile__form-fieldset_name popup__form-input"
            id="profile-avatar"
            name="profile-avatar"
            type="url"
            placeholder="Link"
            required
            onChange={handleAvatarChange}
          />
          <span
            id="profile-avatar-error"
            className="popup-profile__form-error"
          ></span>
        </label>
      </fieldset>
      <button className="popup-profile__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
