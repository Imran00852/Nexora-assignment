import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/routes.js";

dotenv.config({
  path: "./.env",
});

connectDB();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);

//api's
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to Ecom backend!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
