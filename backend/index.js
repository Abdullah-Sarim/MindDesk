import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import todoRoute from "./routes/todo.routes.js";
import noteRoute from "./routes/note.routes.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

//Middleware to parse cookie and get cross origin access
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://mind-desk.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean); // removes undefined/null

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, Postman, mobile apps
      if (!origin) return callback(null, true);

      // normalize origin (remove trailing slash)
      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS blocked origin: ${normalizedOrigin}`)
        );
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


// app.use(cors({
//   origin: process.env.FRONTED_URL,
//   credentials: true,
//   methods: "GET, POST, PUT, DELETE",
//   allowedHeaders: ["Content-Type", "Authorization"], // addind other header(extra info sent with request)
//       })
// );

//app.use(cors());
//Database connection code
try{
  await mongoose.connect(DB_URI)
  console.log("Connected to MongoDB")
} catch (error){
  console.log(error);
}
//route
// app.use(express.json());
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.use("/notes", noteRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {
  console.log(`App listenning at port ${PORT}`);
});