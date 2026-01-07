import User from "../model/user.model.js";
import { z } from "zod"; // library of typescript used for user validation
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email addres" }),
  username: z.string().min(3, { message: "Username atleast 3 characters long" }),
  password: z.string().min(5, { message: "Password atleast 5 charachters long" }),
});

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body; // destructured value
    //const email = req.body.email;
    //const username = req.body.username;
    //const password = req.body.password;

    if (!email || !username || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMessage = validation.error.issues.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res.status(201).json({ message: "User registered successfully", newUser, token });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { path: "/", });
    res.status(200).json({ message: "User logged out successfully" });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

export const userInfo = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({ message: "Username too short" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username },
      { new: true }
    ).select("-password");

    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update username" });
  }
};



// export const logout = (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       // secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//     });

//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error logging out user" });
//   }
// };
