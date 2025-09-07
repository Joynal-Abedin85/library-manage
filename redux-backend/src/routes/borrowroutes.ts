import { Router } from "express";
import { borrowBook, getAllBorrows, getBorrowSummary } from "../controllers/borrowcontrollers";

const router = Router();

router.post("/", borrowBook);
router.get("/summary", getBorrowSummary);
router.get("/", getAllBorrows);


export default router;