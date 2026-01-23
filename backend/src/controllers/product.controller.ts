import { NextFunction, Request, Response } from "express";
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

//PATCH PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stock, tags, description } = req.body;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    {
      ...(name !== undefined && { name }),
      ...(price !== undefined && { price }),
      ...(stock !== undefined && { stock }),
      ...(tags !== undefined && { tags }),
      ...(description !== undefined && { description }),
    },
    { new: true, runValidators: true },
  );

  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }
  res.status(200).json(updatedProduct);
};

//DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new AppError("Product not found", 404);
  }

  res.status(204).send();
};
