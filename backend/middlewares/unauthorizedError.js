export default class UnauthorizedError extends Error {
  constructor(message = "Authorización requerida") {
    super(message);
    this.statusCode = 401;
  }
}
