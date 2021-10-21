const jwt = require("jsonwebtoken");
const ErrorHandler = require("../config/ErrorHandler");
const { SECRET_KEY: secret_key } = process.env;
console.log("secret_key", secret_key);

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader) {
    throw new ErrorHandler(401, "No token provided", "ERROR_AUTH");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    throw new ErrorHandler(401, "Token error", "ERROR_AUTH");
  }

  const [schema, token] = parts;

  if (schema.toLowerCase() !== "bearer") {
    throw new ErrorHandler(401, "Token malformatted", "ERROR_AUTH");
  }

  jwt.verify(token, secret_key, (err, data) => {
    if (err) {
      throw new ErrorHandler(401, "Token Invalid", "ERROR_AUTH");
    }
    next();
  });
};
