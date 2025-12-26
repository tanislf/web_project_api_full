import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).json({ message: "Autorización requerida" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token malformado" });
    }
    return res.status(401).json({ message: "Token inválido" });
  }
}
