import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/product.controller";
import { validateCreateProduct } from "../middlewares/validateProduct.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/", validateCreateProduct, createProduct);

export default router;
