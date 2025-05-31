const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const freeAuth = (request, response, next) => {
  try {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({ message: "Access denied!" });
    }

    try {
      const decodedToken = jwt.verify(
        token.replace("Bearer ", ""),
        jwtSecretKey
      );
      console.log(decodedToken);
    } catch (error) {
      console.log("Invalid token! Access denied!", error);
      return response.status(401).json({ error: error.message });
    }

    console.log(token);
    next();
  } catch (error) {
    console.log(
      "Something went wrong when checking token! Access denied!",
      error
    );
    return response.status(500).json({ error: error.message });
  }
};

module.exports = freeAuth;
