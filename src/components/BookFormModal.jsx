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
      className="modal"
    >
      <h3>Add book</h3>
      <BookForm
        handleBookFormSubmit={props.handleBookFormSubmit}
        validateBookFormField={props.validateBookFormField}
        bookFormData={props.bookFormData}
        bookFormErrors={props.bookFormErrors}
        clearBookForm={props.clearBookForm}
      />
    </Modal>
  );
};

export default bookFormModal;
