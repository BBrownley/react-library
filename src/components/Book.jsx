import React from "react";

const Book = props => {
  return (
    <div className="book" id={props.bookId}>
      <h2>Title: {props.bookProperties.bookTitle}</h2>
      <h2>Author: {props.bookProperties.author}</h2>
      <h2>Pages: {props.bookProperties.pages}</h2>
    </div>
  );
};

export default Book;
