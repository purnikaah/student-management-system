import express from "express";
import "dotenv/config";
import router from "./auth.routes";

const app = express();
app.use(express.json());

app.use("/api/auth, authRoutes");
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
