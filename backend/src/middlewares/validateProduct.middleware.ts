import { Request, Response, NextFunction } from "express";

//Create Product Valiudation
export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, stock, tags } = req.body;

  if (
    !name ||
    price == null ||
    name.length < 3 ||
    stock == null ||
    price < 0 ||
    stock < 0 ||
    !Array.isArray(tags)
  ) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  next();
};

//Update Product Validation
export const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, stock, tags, description } = req.body;

  if (name !== undefined && name.length < 3) {
    return res.status(400).json({ message: "Name too short" });
  }

  if (price !== undefined && price < 0) {
    return res.status(400).json({ message: "Invalid price" });
  }

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({ message: "Invalid stock" });
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return res.status(400).json({ message: "Invalid tags" });
  }

  if (
    description !== undefined &&
    description !== null &&
    typeof description !== "string"
  ) {
    return res.status(400).json({ message: "Invalid description format" });
  }
  next();
};
