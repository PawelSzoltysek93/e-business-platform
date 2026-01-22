import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
