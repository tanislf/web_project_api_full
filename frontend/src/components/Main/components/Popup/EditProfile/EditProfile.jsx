import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const { onClose } = props;
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  //variables de estado para la info del perfil
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  //actualiza name cuando cambie la entrada
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  //actualiza description cuando cambie la entrada
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  //actualiza la info del formulario
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await handleUpdateUser({ name, about: description });
      onClose();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <form
      className="popup__form"
      id="profile-form"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-fieldset">
        <label htmlFor="profile-name">
          <input
            className=" popup__form-fieldset_name popup__form-input"
            id="profile-name"
            name="profileName"
            type="text"
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span
            id="profile-name-error"
            className="popup__form-error-name"
          ></span>
        </label>
        <label htmlFor="profile-job">
          <input
            className=" popup__form-fieldset_info popup__form-input"
            id="profile-job"
            name="profileDescription"
            type="text"
            placeholder="Acerca de mi"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <span
            id="profile-job-error"
            className="popup__form-error-info"
          ></span>
        </label>
      </fieldset>
      <button className="popup__form-button" type="submit">
        Guardar
      </button>
    </form>
  );
}
