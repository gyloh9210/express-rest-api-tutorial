const mysql = require("mysql");
const util = require("util");

/**
 * IMPORTANT
 * Please change config below according to your local
 */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books_store",
});

const query = util.promisify(connection.query).bind(connection);

const getBooks = async function (title = "", country = "") {
  try {
    let statement = "SELECT * FROM books WHERE ";
    statement += `list_title LIKE '%${title}%' `;
    statement += `AND list_country LIKE '%${country}%'`;

    const books = await query(statement);

    return books;
  } catch (e) {
    connection.end();
    console.log(e);
  }
};

const createBook = async function (detail) {
  try {
    const {
      author,
      country,
      imageLink,
      language,
      link,
      pages,
      title,
      year,
    } = detail;

    let statement = `INSERT INTO books (list_author, list_country, list_imageLink, list_language, list_link, list_pages, list_title, list_year) VALUES ('${author}', '${country}', '${imageLink}', '${language}', '${link}', '${pages}', '${title}', '${year}')`;

    const result = await query(statement);

    return result;
  } catch (e) {
    connection.end();
    console.log(e);
  }
};

const getBook = async function (id) {
  try {
    let statement = "SELECT * FROM books WHERE ";
    statement += `book_id = ${id}`;

    const books = await query(statement);

    return books;
  } catch (e) {
    connection.end();
    console.log(e);
  }
};

const updateBook = async function (id, detail) {
  try {
    const {
      author,
      country,
      imageLink,
      language,
      link,
      pages,
      title,
      year,
    } = detail;

    let statement = `UPDATE books SET `;
    statement += `list_author = '${author}',`;
    statement += `list_country = '${country}',`;
    statement += `list_imageLink = '${imageLink}',`;
    statement += `list_language = '${language}',`;
    statement += `list_link = '${link}',`;
    statement += `list_pages = '${pages}',`;
    statement += `list_title = '${title}',`;
    statement += `list_year = '${year}' `;
    statement += `WHERE book_id = ${id}`;

    const result = await query(statement);

    return result;
  } catch (e) {
    connection.end();
    console.log(e);
  }
};

const deleteBook = async function (id) {
  try {
    let statement = `DELETE FROM books WHERE book_id = ${id}`;

    const result = await query(statement);

    return result;
  } catch (e) {
    connection.end();
    console.log(e);
  }
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
