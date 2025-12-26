import { useContext } from "react";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onRemoveCard, onOpenPopup, onCardLike }) {
  const { name, link, likes } = card;
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes.some((id) => id.toString() === currentUser._id);

  const likeButtonClass = `content__grid-description-like ${
    isLiked ? "content__grid-description-like_is-active" : ""
  }`;

  const handleImageClick = () => {
    onOpenPopup({ children: <ImagePopup card={card} /> });
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onRemoveCard(card);
  };

  return (
    <li className="content__grid-card">
      <figure className="content__grid-item">
        <img
          className="content__grid-image"
          src={link}
          alt={name}
          onClick={handleImageClick}
        />
        <button
          aria-label="Delete card"
          className="content__grid-description-trash"
          type="button"
          onClick={handleDeleteClick}
        />
      </figure>

      <div className="content__grid-description">
        <h2 className="content__grid-description-text">{name}</h2>
        <button
          aria-label="Like card"
          className={likeButtonClass}
          type="button"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
