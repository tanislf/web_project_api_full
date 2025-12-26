import Card from "../models/Card.js";

//Obtener cartas
export async function getCards(req, res) {
  try {
    const cards = await Card.find({});

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las cartas" });
  }
}

//Crear nueva carta
export async function createCard(req, res) {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Erorr al crear tu carta", error });
  }
}

//Eliminar cartas por ID
export async function deleteCard(req, res) {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado esta carta" });
    }

    if (card.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await card.deleteOne();

    res.status(200).json({ message: "Carta eliminada correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ mesage: "No se pudo eliminar esta carta, petición inválida" });
  }
}

//Dar like a la carta
export async function likeCard(req, res) {
  try {
    const { id } = req.params;

    console.log(req.user);
    const card = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: "Carta no encontrada" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ message: "Error al dar like" });
  }
}

//Quitar like de la carta
export async function deleteLikeCard(req, res) {
  try {
    const { id } = req.params;

    const card = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: "Carta no encontrada " });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ message: "Error al quitar like" });
  }
}
