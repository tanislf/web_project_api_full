import { Joi } from "celebrate";

export const userIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    about: Joi.string().required(),
  }),
};

export const updateAvatarSchema = {
  body: Joi.object({
    avatar: Joi.string().uri().required(),
  }),
};
