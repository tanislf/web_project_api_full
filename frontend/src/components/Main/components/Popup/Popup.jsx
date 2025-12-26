export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <section className="popup">
      <div
        className={`popup__container ${!title ? "popup-image__content" : ""}`}
      >
        {title && <h3 className="popup__container-title">{title}</h3>}
        {children}

        <button
          className={`popup__form-close-button ${
            !title ? "popup-image__close-button" : ""
          }`}
          onClick={onClose}
          type="button"
        />
      </div>
    </section>
  );
}
