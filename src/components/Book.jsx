import React from "react";

const Book = props => {
  return (
    <div className="book">
      <h2>Title: {props.bookProperties.bookTitle}</h2>
      <h2>Author: {props.bookProperties.author}</h2>
      <h2>Pages: {props.bookProperties.pages}</h2>
      <button
        className="book__edit-book"
        onClick={e => {
          props.editBook(props.bookId);
        }}
      >
        Edit Book
      </button>
      <button
        className="book__delete-book"
        onClick={e => {
          props.deleteBook(props.bookId);
        }}
      >
        Delete Book
      </button>
    </div>
  );
};

export default Book;
