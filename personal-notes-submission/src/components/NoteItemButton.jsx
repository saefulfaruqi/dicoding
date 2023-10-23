import React from "react";

class NoteItemButton extends React.Component {
  render() {
    const {
      id,
      onDeleteArchive,
      onDeleteActive,
      onMoveToArchive,
      archived,
      onMoveToActive,
    } = this.props;

    const handleDelete = () => {
      if (archived === true) {
        onDeleteArchive(id);
      } else {
        onDeleteActive(id);
      }
    };

    const handleMove = () => {
      if (archived === true) {
        onMoveToActive(id);
      } else {
        onMoveToArchive(id);
      }
    };

    return (
      <div className="note-item__action">
        <button className="note-item__delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="note-item__archive-button" onClick={handleMove}>
          {archived === true ? "Pindahkan" : "Arsipkan"}
        </button>
      </div>
    );
  }
}

export default NoteItemButton;
