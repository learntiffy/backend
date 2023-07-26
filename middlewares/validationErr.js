const { validationResult } = require("express-validator");

const Response = require("../models/Response");

module.exports = validationErr = (req, res, next) => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty())
    return res.json(new Response(401, validationErr.array()));
  next();
};
