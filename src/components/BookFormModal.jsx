import React from "react";
import Modal from "react-modal";
import BookForm from "./BookForm";

const bookFormModal = props => {
  return (
    <Modal
      isOpen={props.bookFormOpen}
      onRequestClose={props.clearBookForm}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="book-form-modal"
    >
      <h3>{props.bookToBeEdited ? "Edit" : "Add"} book</h3>
      <BookForm
        handleBookFormSubmit={props.handleBookFormSubmit}
        validateBookFormField={props.validateBookFormField}
        bookFormData={props.bookFormData}
        bookFormErrors={props.bookFormErrors}
        clearBookForm={props.clearBookForm}
      />
      <button
        className="btn-danger book-form-modal__close-modal"
        onClick={props.clearBookForm}
      >
        Close
      </button>
    </Modal>
  );
};

export default bookFormModal;
