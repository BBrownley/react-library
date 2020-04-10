import React, { Component } from "react";

const BookForm = props => {
  return (
    <div>
      <form onSubmit={props.handleBookFormSubmit} className="book-form">
        <label>
          Book title:{" "}
          <input
            onChange={props.validateBookFormField}
            type="text"
            value={props.bookFormData["bookTitle"]}
            id="bookTitle"
            name="Book title"
          />
        </label>
        {props.bookFormErrors["bookTitle"] && (
          <h4 className="book-form__error">
            {props.bookFormErrors["bookTitle"]}
          </h4>
        )}
        <label>
          Author:{" "}
          <input
            onChange={props.validateBookFormField}
            type="text"
            value={props.bookFormData["author"]}
            id="author"
            name="Author"
          />
        </label>
        {props.bookFormErrors["author"] && (
          <h4 className="book-form__error">{props.bookFormErrors["author"]}</h4>
        )}
        <label>
          # Pages:{" "}
          <input
            onChange={props.validateBookFormField}
            type="text"
            value={props.bookFormData["pages"]}
            id="pages"
            name="# Pages"
          />
        </label>
        {props.bookFormErrors["pages"] && (
          <h4 className="book-form__error">{props.bookFormErrors["pages"]}</h4>
        )}
        <input type="submit" value="Submit" />
        <button className="btn-danger" onClick={props.clearBookForm}>
          Close
        </button>
      </form>
    </div>
  );
};

export default BookForm;
