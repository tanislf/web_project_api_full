import { useState } from "react";

export default function NewCard(props) {
  const { onAddCard, onClose } = props;
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  //actualiza titulo de tarjeta cuando cambie la entrada
  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  //actualiza link de tarjeta cuando cambie la entrada
  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  };

  //mandar datos al App
  const handleSubmitCard = async (evt) => {
    evt.preventDefault();

    try {
      await onAddCard({ name: title, link });
      setTitle("");
      setLink("");
      onClose();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <form
      className="popup-card__form"
      id="new-card-form"
      name="card-form"
      noValidate
      onSubmit={handleSubmitCard}
    >
      <fieldset className="popup-card__form-fieldset">
        <label htmlFor="card-name">
          <input
            className=" popup-card__form-fieldset_name popup__form-input"
            id="card-name"
            name="card-name"
            type="text"
            placeholder="Título"
            minLength="2"
            maxLength="30"
            required
            value={title}
            onChange={handleTitleChange}
          />
          <span id="card-name-error" className="popup__form-error-name"></span>
        </label>
        <label htmlFor="card-link">
          <input
            className=" popup-card__form-fieldset_info popup__form-input"
            id="card-link"
            name="link"
            type="url"
            placeholder="Enlace a la imagen"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span id="card-link-error" className="popup__form-error-info"></span>
        </label>
      </fieldset>
      <button className="popup__form-button" type="submit">
        Crear
      </button>
    </form>
  );
}
