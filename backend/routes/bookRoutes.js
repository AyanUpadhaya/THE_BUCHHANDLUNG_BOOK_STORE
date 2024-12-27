const express = require("express");
const {
  createBook,
  getAllBooks,
  getBooksByStore,
  updateBook,
  deleteBook,
  getSingleBook,
  getBooksByCategoryId,
} = require("../controllers/bookController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Create a new book
router.post("/books", verifyToken, createBook);

// Get all books
router.get("/books", getAllBooks);

// Get books by store ID
router.get("/books/store/:store_id", getBooksByStore);

// single book by its ID
router.get("/books/:book_id", getSingleBook);

//get books by category id
router.get("/books/category/:categoryId", getBooksByCategoryId);

// Update book
router.put("/books/:book_id", verifyToken, updateBook);

// Delete book
router.delete("/books/:book_id", verifyToken, deleteBook);

module.exports = router;
