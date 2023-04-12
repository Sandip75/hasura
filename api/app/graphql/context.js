const config = require("config").hasura;
const jwt = require("jwt-simple");
const { AuthenticationError } = require("apollo-server-express");

module.exports = async ({ req }) => {
  const authHeaderValue = req.headers.authorization;
  if (!authHeaderValue) throw new AuthenticationError("Forbidden");

  const token = authHeaderValue.replace("Bearer ", "");
  const secret = config.jwtSecret.key;
  try {
    req.claims = jwt.decode(token, secret);
    if (req.claims.user && req.claims.user.id) {
      return { token: req.claims };
    } else {
      throw new AuthenticationError("Forbidden");
    }
  } catch (err) {
    throw new AuthenticationError("Token is not valid");
  }
};
