import React from "react";
import { getInitialData } from "../utils";
import Header from "./Header";
import NotesForm from "./NotesForm";
import ActiveNotes from "./ActiveNotes";
import ArchiveNotes from "./ArchiveNotes";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNotes: getInitialData(),
      archiveNotes: [],
      filteredActiveNotes: [],
      filterdArchiveNotes: [],
      searchValue: "",
    };

    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteActiveHandler = this.onDeleteActiveHandler.bind(this);
    this.onDeleteArchiveHandler = this.onDeleteArchiveHandler.bind(this);
    this.moveToArchiveHandler = this.moveToArchiveHandler.bind(this);
    this.moveToActiveHandler = this.moveToActiveHandler.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
  }

  searchByTitle(titleInput) {
    this.setState({ searchValue: titleInput });
    if (titleInput === "") {
      this.setState({
        filteredActiveNotes: [],
        filterdArchiveNotes: [],
      });
    } else {
      const filteredActiveNotes = this.state.activeNotes.filter((note) =>
        note.title.toLowerCase().includes(titleInput.toLowerCase())
      );
      const filterdArchiveNotes = this.state.archiveNotes.filter((note) =>
        note.title.toLowerCase().includes(titleInput.toLowerCase())
      );
      this.setState({ filteredActiveNotes, filterdArchiveNotes });
    }
  }

  moveToActiveHandler(id) {
    const archiveNotes = this.state.archiveNotes.filter(
      (note) => note.id !== id
    );
    const noteToMove = this.state.archiveNotes.find((note) => note.id === id);
    this.setState({
      archiveNotes,
      activeNotes: [
        ...this.state.activeNotes,
        { ...noteToMove, archived: false },
      ],
    });
  }
  moveToArchiveHandler(id) {
    const activeNotes = this.state.activeNotes.filter((note) => note.id !== id);
    const noteToMove = this.state.activeNotes.find((note) => note.id === id);
    this.setState({
      activeNotes,
      archiveNotes: [
        ...this.state.archiveNotes,
        { ...noteToMove, archived: true },
      ],
    });
  }

  onDeleteActiveHandler(id) {
    const activeNotes = this.state.activeNotes.filter((note) => note.id !== id);
    this.setState({ activeNotes });
  }

  onDeleteArchiveHandler(id) {
    const archiveNotes = this.state.archiveNotes.filter(
      (note) => note.id !== id
    );
    this.setState({ archiveNotes });
  }

  onAddNotesHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        activeNotes: [
          ...prevState.activeNotes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date(),
          },
        ],
      };
    });
  }

  render() {
    return (
      <div className="note-app">
        <Header searchByTitle={this.searchByTitle} />

        <div className="note-app__body">
          <NotesForm onAddNotesHandler={this.onAddNotesHandler} />
          <ActiveNotes
            activeNotes={
              this.state.searchValue !== ""
                ? this.state.filteredActiveNotes
                : this.state.activeNotes
            }
            onDeleteActive={this.onDeleteActiveHandler}
            moveToArchive={this.moveToArchiveHandler}
          />
          <ArchiveNotes
            archiveNotes={
              this.state.searchValue !== ""
                ? this.state.filterdArchiveNotes
                : this.state.archiveNotes
            }
            onDeleteArchive={this.onDeleteArchiveHandler}
            moveToActive={this.moveToActiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NotesApp;
