import mongoose from "mongoose";
import validator from "validator";

//Esquema
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Modelo
const Card = mongoose.model("Card", cardSchema);
export default Card;
