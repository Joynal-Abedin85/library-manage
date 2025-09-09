"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookroutes_1 = __importDefault(require("./routes/bookroutes"));
const borrowroutes_1 = __importDefault(require("./routes/borrowroutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('🚀 Library Management Server is running! \n for all books https://redux-backend-lac.vercel.app/api/books \n for borrow details https://redux-backend-lac.vercel.app/api/borrows ');
});
app.use('/api/books', bookroutes_1.default);
app.use('/api/borrows', borrowroutes_1.default);
exports.default = app;
