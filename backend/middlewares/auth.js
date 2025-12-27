import jwt from "jsonwebtoken";
import UnauthorizedError from "./unauthorizedError.js";

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Autorización requerida"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Token expirado"));
    }
    if (err.name === "JsonWebTokenError") {
      return next(new UnauthorizedError("Token inválido"));
    }
    return next(new UnauthorizedError("Error de autorización"));
  }
}
