import React from "react";
import Modal from "react-modal";

const DeleteBookModal = props => {
  return (
    <Modal
      isOpen={!!props.bookToBeDeleted}
      onRequestClose={props.clearDeleteBook}
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="delete-book-modal"
    >
      {props.bookToBeDeleted && (
        <div>
          <h3>
            Are you sure you want to delete "{props.bookToBeDeleted.bookTitle}"?
          </h3>
          <button
            className="btn btn-danger"
            onClick={props.clearBookToBeDeleted}
          >
            No
          </button>
          <button
            className="btn"
            onClick={e => {
              props.confirmDeleteBook(props.bookId);
            }}
          >
            Yes
          </button>
        </div>
      )}
    </Modal>
  );
};

export default DeleteBookModal;
