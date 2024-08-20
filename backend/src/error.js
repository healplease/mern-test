export class ValidationError extends Error {
  constructor(errors) {
    super("Validation Error");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export const errorHandler = (err, _req, res, _next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ errors: err.errors });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ errors: { token: "invalid" } });
  }

  console.error(err);
  res.status(500).json({ err: err.message });
}