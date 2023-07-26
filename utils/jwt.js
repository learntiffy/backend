const jwt = require("jsonwebtoken");

exports.generate = (fields, expiresIn) => {
  const jwtToken = jwt.sign(fields, process.env.JWT_SECRET || "secret", {
    expiresIn: expiresIn,
  });
  return jwtToken;
};

exports.verify = (jwtToken, ignoreExpiration) => {
  let decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET || "secret", {
    ignoreExpiration: ignoreExpiration,
  });
  return decodedToken;
};
