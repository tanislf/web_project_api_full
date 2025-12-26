import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

//Esquema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Tania López",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Exploradora y fotógrafa",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/736x/a5/26/bb/a526bb71880fb846417de69656473b04.jpg",
    validate: {
      validator: (v) =>
        validator.isURL(v, {
          protocols: ["http", "https"],
          require_protocol: true,
          require_tld: true,
          allow_underscores: true,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: false,
          allow_fragments: true,
        }),
      message: (props) => `${props.value} no es una URL válida`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Debe ser un email válido",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then(function (user) {
      if (!user) return Promise.reject(new Error("Credenciales incorrrectas"));
      return bcrypt.compare(password, user.password).then(function (matched) {
        if (!matched)
          return Promise.reject(new Error("Credenciales incorrectas"));
        return user;
      });
    });
};

//Modelo
const User = mongoose.model("User", userSchema);
export default User;
