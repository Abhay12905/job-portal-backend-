import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "Failed",
        message: "No Authorization header"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Token missing"
      });
    }

    const data = jwt.verify(token, "abh");

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "Failed",
      message: error.message
    });
  }
};