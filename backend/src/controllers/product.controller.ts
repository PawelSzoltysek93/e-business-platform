import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

// GET ALL PRODUCTS
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
    res.status(200);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.messagge ?? "Failed to fetch products" });
  }
};

//POST PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || price < 0 || stock < 0) {
      return res.status(400).json({ Message: "Missing required fields" });
    }
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message ?? "Failed to create product" });
  }
};
