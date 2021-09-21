module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" });
  }

  const [schema, token] = parts;

  // if (!/Bearer$/i.test(scheme)) {
  if (schema.toLowerCase() !== "bearer") {
    return res.status(401).json({ error: "Token malformatted" });
  }

  

  next();
};
