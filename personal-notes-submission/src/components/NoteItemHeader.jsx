import React from "react";
import { showFormattedDate } from "../utils";

class NoteItemHeader extends React.Component {
  render() {
    return (
      <>
        <h3 className="note-item__title">{this.props.title}</h3>
        <p className="note-item__date">{showFormattedDate(this.props.date)}</p>
      </>
    );
  }
}

export default NoteItemHeader;
