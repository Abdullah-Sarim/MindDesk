import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 5 * 24 * 60 * 60 * 1000, // ✅ 5 days
    path: "/",
  });


  return token;
};
