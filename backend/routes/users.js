import express from "express";
import {
  getUser,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatarUser,
} from "../controllers/users.js";
import { celebrate, Joi, Segments } from "celebrate";
import {
  userIdSchema,
  updateProfileSchema,
  updateAvatarSchema,
} from "../middlewares/userJoi.js";

const router = express.Router();

//Obtener usuairos
router.get("/", getUser);

//Obtener usuario actual
router.get("/me", getCurrentUser);

//Obtener usuarios por id
router.get("/:id", celebrate(userIdSchema), getUserById);

//Actualizar el perfil
router.patch("/me/profile", celebrate(updateProfileSchema), updateUser);

//Actualizar el avatar
router.patch("/me/avatar", celebrate(updateAvatarSchema), updateAvatarUser);

export default router;
