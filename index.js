const express = require("express");
const app = express();
const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("./database/main");

app.use(express.json());

/**
 * GET books - filter books
 */
app.get("/books", async (req, res, next) => {
  const { title, country } = req.query;

  const book = await getBooks(title, country);

  res.json(book);
});

/**
 * GET book - get detail of a book
 */
app.get("/book/:id", async (req, res, next) => {
  const { id } = req.params;

  const book = await getBook(id);

  res.json(book);
});

/**
 * POST book - create a book
 */
app.post("/book", async (req, res, next) => {
  const {
    author,
    title,
    country,
    imageLink,
    language,
    link,
    pages,
    year,
  } = req.body;

  await createBook({
    author,
    title,
    country,
    imageLink,
    language,
    link,
    pages,
    year,
  });

  res.json({
    message: "Added",
  });
});

/**
 * PUT book - update a book detail
 */
app.put("/book/:id", async (req, res, next) => {
  const {
    author,
    title,
    country,
    imageLink,
    language,
    link,
    pages,
    year,
  } = req.body;

  const id = req.params.id;

  await updateBook(id, {
    author,
    title,
    country,
    imageLink,
    language,
    link,
    pages,
    year,
  });

  res.json({
    message: "Updated",
  });
});

/**
 * DELETE book - delete a book
 */
app.delete("/book/:id", async (req, res, next) => {
  const id = req.params.id;

  await deleteBook(id);

  res.json({
    message: "Deleted",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
