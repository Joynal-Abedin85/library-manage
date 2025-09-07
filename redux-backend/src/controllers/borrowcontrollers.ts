// src/controllers/borrowController.ts
import { Request, Response } from "express";
import Borrow from "../models/borrow";
import Book from "../models/book";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate, returnDate } = req.body;

    if (!book || !quantity || !dueDate) {
      return res.status(400).json({ message: "Book, quantity, and dueDate are required" });
    }

    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

  
    if (existingBook.copies < quantity) {
      return res.status(400).json({ message: "Not enough copies available" });
    }

    existingBook.copies -= quantity;
    if (existingBook.copies <= 0) {
      existingBook.available = false;
    }
    await existingBook.save();

    const borrow = await Borrow.create({
      book,
      quantity,
      dueDate,
      returnDate: returnDate || null,
    });

    res.status(201).json(borrow);
  } catch (error: any) {
    console.error("Borrow API Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
    ]);
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllBorrows = async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.find().populate("book");
    res.json(borrows);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
