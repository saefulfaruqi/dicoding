import React from "react";
import CardNotes from "./CardNotes";
class ActiveNotes extends React.Component {
  render() {
    return (
      <>
        <h2>Catatan Aktif</h2>
        <div className="notes-list">
          {this.props.activeNotes.map((note) => {
            return (
              <CardNotes
                key={note.id}
                id={note.id}
                {...note}
                onDeleteActive={this.props.onDeleteActive}
                onMoveToArchive={this.props.moveToArchive}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default ActiveNotes;
