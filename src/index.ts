import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
