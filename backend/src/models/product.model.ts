import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  tags: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  ProductSchema,
);
