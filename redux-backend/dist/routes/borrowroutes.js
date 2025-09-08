"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowcontrollers_1 = require("../controllers/borrowcontrollers");
const router = (0, express_1.Router)();
router.post("/", borrowcontrollers_1.borrowBook);
router.get("/summary", borrowcontrollers_1.getBorrowSummary);
router.get("/", borrowcontrollers_1.getAllBorrows);
exports.default = router;
