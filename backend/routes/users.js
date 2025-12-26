import express from "express";
import {
  getUser,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatarUser,
} from "../controllers/users.js";

const router = express.Router();

//Obtener usuairos
router.get("/", getUser);

//Obtener usuario actual
router.get("/me", getCurrentUser);

//Obtener usuarios por id
router.get("/:id", getUserById);

//Actualizar el perfil
router.patch("/me/profile", updateUser);

//Actualizar el avatar
router.patch("/me/avatar", updateAvatarUser);

export default router;
