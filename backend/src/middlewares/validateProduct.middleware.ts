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
