const UserType = require("../data/UserType");
const Response = require("../models/Response");
const jwt = require("../utils/jwt");

module.exports = async (req, res, next) => {
  try {
    const authHeaders = req.get("Authorization").split(" ");
    if (authHeaders[1]) {
      const jwtToken = authHeaders[1];
      const { id, type } = jwt.verify(jwtToken, false);
      if (type === UserType.USER) {
        req.id = id;
        next();
      }
    } else {
      return res.json(new Response(401, "Invalid token!!"));
    }
  } catch (err) {
    return res.status(401).json(new Response(401, "Invalid token!!"));
  }
};
