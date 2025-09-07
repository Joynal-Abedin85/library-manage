import mongoose, { Schema, Document } from "mongoose";

export interface IBorrow extends Document {
  book: mongoose.Schema.Types.ObjectId | null;
  quantity: number;
  dueDate: Date;
  returnDate?: Date | null;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", default: null },
    quantity: { type: Number, required: true, default: 1 },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IBorrow>("Borrow", borrowSchema);
