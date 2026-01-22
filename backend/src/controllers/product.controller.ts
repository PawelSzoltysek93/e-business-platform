import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { AppError } from "../errors/AppError";

// GET ALL PRODUCTS
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await ProductModel.find();

  if (products.length === 0) {
    throw new AppError("No products found", 404);
  }

  res.status(200).json(products);
};

//POST PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, tags, description } = req.body;

  const product = await ProductModel.create({
    name,
    price,
    stock,
    tags,
    description,
  });

  if (!product) {
    throw new AppError("Product not created", 400);
  }

  res.status(201).json(product);
};
