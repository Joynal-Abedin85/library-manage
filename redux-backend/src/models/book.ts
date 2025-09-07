// src/models/book.ts
import mongoose, { Schema, Document } from "mongoose";
import Borrow from "./borrow";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, default: 1 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc: any = await this.model.findOne(this.getQuery()); // current book
    if (doc) {
      await Borrow.deleteMany({ book: doc._id });
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});

export default mongoose.model<IBook>("Book", bookSchema);
