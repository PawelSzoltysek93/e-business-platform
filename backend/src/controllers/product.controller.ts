import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";
import { AppError } from "../errors/AppError";

// GET ALL PRODUCTS
export const getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const sortBy = (req.query.sortBy as string) || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  //FILTERING
  const filter: any = {};

  if (req.query.minPrice) {
    filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
  }

  if (req.query.maxPrice) {
    filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
  }

  if (req.query.tag) {
    filter.tags = req.query.tag;
  }

  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: "i" };
  }

  //QUERY
  const products = await Product.find(filter)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  res.status(200).json({
    data: products,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};

//POST PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, tags, description } = req.body;

  const product = await Product.create({
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

  const updatedProduct = await Product.findByIdAndUpdate(
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

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new AppError("Product not found", 404);
  }

  res.status(204).send();
};
