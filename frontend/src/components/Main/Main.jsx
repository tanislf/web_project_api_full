import { useContext } from "react";
import Card from "./components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const {
    cards,
    onAddCard,
    onRemoveCard,
    onCardLike,
    onEditProfile,
    onEditAvatar,
    onOpenImage,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <figure className="profile__item">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <button className="profile__image-edit" onClick={onEditAvatar} />
        </figure>

        <div className="profile__info">
          <p className="profile__info-name">{currentUser.name}</p>
          <button
            aria-label="Edit profile"
            className="profile__info-edit-button"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__info-description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={onAddCard}
        />
      </section>

      <ul className="content__grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onRemoveCard={onRemoveCard}
            onCardLike={onCardLike}
            onOpenImage={onOpenImage}
          />
        ))}
      </ul>
    </>
  );
}
