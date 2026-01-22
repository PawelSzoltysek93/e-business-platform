import express from "express";
/* import cors from 'cors'; */
import { connectDB } from "./config/database";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middlewares/error.middleware";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
