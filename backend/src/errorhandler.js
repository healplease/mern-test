export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ errors: err.errors });
  }

  console.error(err.stack);
  return res.status(500).end();
};