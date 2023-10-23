import React from "react";
import NoteItemBody from "./NoteItemBody";
import NoteItemButton from "./NoteItemButton";
import NoteItemHeader from "./NoteItemHeader";

class CardNotes extends React.Component {
  render() {
    return (
      <>
        <div className="note-item">
          <div className="note-item__content">
            <NoteItemHeader
              title={this.props.title}
              date={this.props.createdAt}
            />
            <NoteItemBody body={this.props.body} />
          </div>
          <NoteItemButton
            id={this.props.id}
            onDeleteActive={this.props.onDeleteActive}
            onDeleteArchive={this.props.onDeleteArchive}
            archived={this.props.archived}
            onMoveToArchive={this.props.onMoveToArchive}
            onMoveToActive={this.props.onMoveToActive}
          />
        </div>
      </>
    );
  }
}

export default CardNotes;
