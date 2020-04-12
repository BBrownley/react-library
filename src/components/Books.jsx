import React, { Component } from "react";
import Book from "./Book";

const Books = props => {
  return (
    <div>
      {props.books.map((book, index) => {
        return (
          <Book
            bookProperties={book}
            key={index}
            bookId={index}
            editBook={props.editBook}
            deleteBook={props.deleteBook}
          />
        );
      })}
    </div>
  );
};

export default Books;
