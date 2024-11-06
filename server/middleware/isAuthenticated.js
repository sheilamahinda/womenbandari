const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decode = await jwt.verify(token, "your_jwt_secret");
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuthenticated;
