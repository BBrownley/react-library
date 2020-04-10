import React, { Component } from "react";

const AddBook = props => {
  return (
    <div>
      <button onClick={props.openBookForm}>Add Book</button>
    </div>
  );
};

export default AddBook;
