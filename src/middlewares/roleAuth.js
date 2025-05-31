const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const autorizedRoles = (...allowedPermissions) => {
  return (request, response, next) => {
    const token = request.headers.authorization;
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), jwtSecretKey);
    // Replace 'role' with the actual property name in your JWT payload
    if (!allowedPermissions.includes(decodedToken.permission)) {
      return response.status(403).json({
        message: "Access denied! You don't have permission to go here!",
      });
    }
    next();
  };
};

module.exports = autorizedRoles;
