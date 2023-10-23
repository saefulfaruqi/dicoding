import React from "react";
import CardNotes from "./CardNotes";

class ArchiveNotes extends React.Component {
  render() {
    // console.log(this.props, "archive notes");
    return (
      <>
        <h2>Arsip</h2>
        {this.props.archiveNotes.length === 0 ? (
          <p className="notes-list__empty-message">Tidak ada catatan arsip</p>
        ) : (
          <div className="notes-list">
            {this.props.archiveNotes.map((note) => {
              return (
                <CardNotes
                  key={note.id}
                  id={note.id}
                  {...note}
                  onDeleteArchive={this.props.onDeleteArchive}
                  onMoveToActive={this.props.moveToActive}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default ArchiveNotes;
