const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
 
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not allowed to access this route");
  }
};

module.exports = authenticationMiddleware;
