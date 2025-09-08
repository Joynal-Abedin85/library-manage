"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBorrows = exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_1 = __importDefault(require("../models/borrow"));
const book_1 = __importDefault(require("../models/book"));
const borrowBook = async (req, res) => {
    try {
        const { book, quantity, dueDate, returnDate } = req.body;
        if (!book || !quantity || !dueDate) {
            return res.status(400).json({ message: "Book, quantity, and dueDate are required" });
        }
        const existingBook = await book_1.default.findById(book);
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
        const borrow = await borrow_1.default.create({
            book,
            quantity,
            dueDate,
            returnDate: returnDate || null,
        });
        res.status(201).json(borrow);
    }
    catch (error) {
        console.error("Borrow API Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res) => {
    try {
        const summary = await borrow_1.default.aggregate([
            { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
        ]);
        res.json(summary);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.getBorrowSummary = getBorrowSummary;
const getAllBorrows = async (req, res) => {
    try {
        const borrows = await borrow_1.default.find().populate("book");
        res.json(borrows);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.getAllBorrows = getAllBorrows;
