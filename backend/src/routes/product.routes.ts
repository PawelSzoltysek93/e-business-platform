import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../controllers/product.controller";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/validateProduct.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/", validateCreateProduct, createProduct);
router.patch("/:id", validateObjectId, validateUpdateProduct, updateProduct);

export default router;
