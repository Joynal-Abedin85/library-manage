import { Request, Response } from 'express';
import Book from '../models/book';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
