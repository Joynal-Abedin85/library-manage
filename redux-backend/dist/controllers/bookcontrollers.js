"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const getBooks = async (req, res) => {
    const books = await book_1.default.find();
    res.json(books);
};
exports.getBooks = getBooks;
const createBook = async (req, res) => {
    const book = new book_1.default(req.body);
    await book.save();
    res.status(201).json(book);
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    const updatedBook = await book_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    await book_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
exports.deleteBook = deleteBook;
