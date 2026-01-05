import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import roleTestRoutes from "./routes/roleTestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";




dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());


app.use("/api/auth", authRoutes);
app.use("/api/test", roleTestRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("PublicSeva Backend Running");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

