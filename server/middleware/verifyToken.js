import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;   // 👈 THIS CREATES req.user

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
