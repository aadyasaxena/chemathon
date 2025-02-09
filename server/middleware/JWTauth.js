import jwt from "jsonwebtoken";

const authenticateAPIUser = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      if (allowedRoles.length > 0 && !allowedRoles.includes(decode.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      next();
    } catch (err) {
      console.error("JWT Verification Error: ", err);
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  };
};

export default authenticateAPIUser;
