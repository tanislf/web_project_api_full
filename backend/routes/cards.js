import express from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} from "../controllers/cards.js";

const router = express.Router();

//Obtener cartas
router.get("/", getCards);

//Crear cartas
router.post("/", createCard);

//Eliminar cartas por id
router.delete("/:id", deleteCard);

// Dar like a una tarjeta
router.put("/:id/likes", likeCard);

//Eliminar like a una tarjeta
router.delete("/:id/likes", deleteLikeCard);

export default router;
