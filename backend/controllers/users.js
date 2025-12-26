import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Obtener usuarios
export async function getUser(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos de usuarios" });
  }
}

//Obtener usuarios por ID
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const userId = await User.findById(id);

    if (!userId) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(userId);
  } catch (error) {
    res.status(400).json({ message: "ID inválido o petición erronea" });
  }
}

//Obtener usuario actual
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
}

//Crear nuevo usuario
export async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      mesage: "Usuario creado exitosamente",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Este usuario ya fue registrado o error al crear nuevo usuario",
      error,
    });
  }
}

//Actualizar perfil del usuario
export async function updateUser(req, res) {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Datos inválidos" });
  }
}

//Actualizar foto del usuario
export async function updateAvatarUser(req, res) {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ message: "Avatar requerido" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Datos inválidos" });
  }
}

//obtener usuario, verificar contraseña, crear y enviar token
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error.message });
  }
}
