import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

// GET ALL PRODUCTS
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200);
    res.json(products);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message ?? "Failed to fetch products" });
  }
};

//POST PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, tags, description } = req.body;

    const product = await ProductModel.create({
      name,
      price,
      stock,
      tags,
      description,
    });
    res.status(201).json(product);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message ?? "Failed to create product" });
  }
};
