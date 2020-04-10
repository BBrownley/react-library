import React, { Component } from "react";

import Header from "./Header";
import AddBook from "./AddBook";
import Books from "./Books";
import BookFormModal from "./BookFormModal";

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
      bookFormOpen: false
    };
    this.validateBookFormField = this.validateBookFormField.bind(this);
    this.openBookForm = this.openBookForm.bind(this);
    this.clearBookForm = this.clearBookForm.bind(this);
    this.handleBookFormSubmit = this.handleBookFormSubmit.bind(this);
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
          <Books books={this.state.books} />
        </div>
        <BookFormModal
          bookFormData={this.state.bookFormData}
          bookFormErrors={this.state.bookFormErrors}
          validateBookFormField={this.validateBookFormField}
          handleBookFormSubmit={this.handleBookFormSubmit}
          bookFormOpen={this.state.bookFormOpen}
          clearBookForm={this.clearBookForm}
        />
      </div>
    );
  }
}
