import React, { Component } from "react";
import Book from "./Book";

const Books = props => {
  return (
    <div>
      {props.books.map((book, index) => {
        return <Book bookProperties={book} bookId={index} />;
      })}
    </div>
  );
};

export default Books;
