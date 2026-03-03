//crear la app
import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import { createUser, login } from "./controllers/users.js";
import auth from "./middlewares/auth.js";
import cors from "cors";

import { errors } from "celebrate";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

//Lista de orígenes permitidos
// const allowedCors = [
//   "https://tripleten.tk",
//   "http://tripleten.tk",
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "https://tanisaround.jumpingcrab.com",
//   "https://www.tanisaround.jumpingcrab.com",
// ];

// app.use(
//   cors({
//     origin: allowedCors,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

app.use(cors());
//Middleware para que express pueda leer JSON en las peticiones
app.use(express.json());

//Rutas de autenticación
app.post("/signin", login);
app.post("/signup", createUser);

//Todas las rutas para los usuarios y cartas
app.use(auth);
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

//Middleware para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

//para conectar a la base de datos
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar:", err));

//Controlador de errorres celebrate
app.use(errors());

//Controlador de errores centralizado
app.use(errorHandler);

//encender el servidor
app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`),
);
