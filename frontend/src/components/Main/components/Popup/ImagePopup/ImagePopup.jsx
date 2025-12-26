export default function ImagePopup({ card }) {
  if (!card) return null;
  const { name, link } = card;
  return (
    <section className="popup-image__content ">
      <div className="popup-image__content-container">
        <img className="popup-image__image" src={link} alt={name} />
        <p className="popup-image__image-title ">{name}</p>
      </div>
    </section>
  );
}
