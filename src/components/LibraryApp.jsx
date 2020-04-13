import React, { Component } from "react";

import Header from "./Header";
import AddBook from "./AddBook";
import Books from "./Books";
import BookFormModal from "./BookFormModal";
import DeleteBookModal from "./DeleteBookModal";

export default class LibraryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookFormData: {
        bookTitle: "",
        author: "",
        pages: ""
      },
      bookFormErrors: {
        bookTitle: undefined,
        author: undefined,
        pages: undefined
      },
      bookFormOpen: false,
      bookToBeDeleted: undefined
    };
    this.validateBookFormField = this.validateBookFormField.bind(this);
    this.openBookForm = this.openBookForm.bind(this);
    this.clearBookForm = this.clearBookForm.bind(this);
    this.handleBookFormSubmit = this.handleBookFormSubmit.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.clearBookToBeDeleted = this.clearBookToBeDeleted.bind(this);
    this.confirmDeleteBook = this.confirmDeleteBook.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("books");
      const books = JSON.parse(json);

      if (books) {
        this.setState(() => ({ books }));
      }
    } catch (e) {
      console.log("Error");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.books.length !== this.state.books.length) {
      const json = JSON.stringify(this.state.books);
      localStorage.setItem("books", json);
    }
  }

  validateBookFormField(event) {
    let { id, value, name } = event.target || event;
    let errorMsg = undefined;

    if (id === "pages") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (value.trim().length < 1) {
      errorMsg = `${name} field cannot be empty`;
    }

    this.setState(prevState => {
      const updatedData = { ...prevState.bookFormData };
      updatedData[id] = value;

      const updatedErrors = { ...prevState.bookFormErrors };
      updatedErrors[id] = errorMsg;

      return {
        bookFormData: updatedData,
        bookFormErrors: updatedErrors
      };
    });
  }

  openBookForm() {
    this.setState(() => ({ bookFormOpen: true }));
  }

  clearBookForm() {
    this.setState(() => ({ bookFormOpen: false }));
  }

  editBook(bookId) {
    console.log(`Editing book # ${bookId}`);
  }

  deleteBook(bookIndex) {
    console.log(`Deleting book # ${bookIndex}`);
    this.setState(() => ({
      bookToBeDeleted: { ...this.state.books[bookIndex], bookIndex }
    }));
  }

  clearBookToBeDeleted() {
    this.setState(() => ({ bookToBeDeleted: undefined }));
  }

  confirmDeleteBook() {
    const removeBookIndex = this.state.bookToBeDeleted.bookIndex;
    const updatedBooks = this.state.books.map(book => book);
    updatedBooks.splice(removeBookIndex, 1);

    this.setState(prevState => {
      return {
        books: updatedBooks,
        bookToBeDeleted: undefined
      };
    });
    // TODO: UPDATE LOCAL STORAGE
  }

  handleBookFormSubmit(e) {
    e.preventDefault();

    const Book = {};
    const fieldElements = e.target.querySelectorAll('input[type="text"]');

    Array.from(fieldElements).forEach(el => {
      this.validateBookFormField(el);
      const { id, value } = el;
      Object.assign(Book, { [id]: value });
    });

    const allFieldsFilled = Object.values(Book).every(val => {
      return val.length > 0;
    });

    if (allFieldsFilled) {
      this.setState(prevState => {
        return {
          bookFormOpen: false,
          books: prevState.books.concat(Book),
          bookFormData: {
            bookTitle: "",
            author: "",
            pages: ""
          }
        };
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <Header />
          <AddBook openBookForm={this.openBookForm} />
          <Books
            books={this.state.books}
            editBook={this.editBook}
            deleteBook={this.deleteBook}
          />
        </div>
        <BookFormModal
          bookFormData={this.state.bookFormData}
          bookFormErrors={this.state.bookFormErrors}
          validateBookFormField={this.validateBookFormField}
          handleBookFormSubmit={this.handleBookFormSubmit}
          bookFormOpen={this.state.bookFormOpen}
          clearBookForm={this.clearBookForm}
        />
        <DeleteBookModal
          bookToBeDeleted={this.state.bookToBeDeleted}
          clearBookToBeDeleted={this.clearBookToBeDeleted}
          confirmDeleteBook={this.confirmDeleteBook}
        />
      </div>
    );
  }
}
