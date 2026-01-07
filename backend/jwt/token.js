import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
    // expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)  // 5 days expiry time
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.MODE != devlopment,
    sameSite: process.env.MODE = "development" ? "lax" : "none",
    maxAge: 5*24*60*1000,
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};