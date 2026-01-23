import express from "express";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use(errorHandler);
