import React from "react";
import { getInitialData, showFormattedDate } from "../utils";
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
      initialActiveNotes: [],
      initialArchiveNotes: [],
    };

    this.initialActiveNotes = [...this.state.activeNotes];
    

    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteActiveHandler = this.onDeleteActiveHandler.bind(this);
    this.onDeleteArchiveHandler = this.onDeleteArchiveHandler.bind(this);
    this.moveToArchiveHandler = this.moveToArchiveHandler.bind(this);
    this.moveToActiveHandler = this.moveToActiveHandler.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
  }

  updateInitialData = () => {
    this.setState({
      initialActiveNotes: [...this.state.activeNotes],
      initialArchiveNotes: [...this.state.archiveNotes],
    });
  };

  searchByTitle(title) {
    if (title === "") {
      this.setState({
        activeNotes: [...this.state.initialActiveNotes],
        archiveNotes: [...this.state.initialArchiveNotes],
      });
    } else {
      const activeNotes = this.state.initialActiveNotes.filter((note) =>
        note.title.toLowerCase().includes(title.toLowerCase())
      );
      const archiveNotes = this.state.initialArchiveNotes.filter((note) =>
        note.title.toLowerCase().includes(title.toLowerCase())
      );
      this.setState({ activeNotes, archiveNotes });
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
    this.updateInitialData();
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
    this.updateInitialData();
  }

  onDeleteActiveHandler(id) {
    const activeNotes = this.state.activeNotes.filter((note) => note.id !== id);
    this.setState({ activeNotes });
    this.updateInitialData();
  }

  onDeleteArchiveHandler(id) {
    const archiveNotes = this.state.archiveNotes.filter(
      (note) => note.id !== id
    );
    this.setState({ archiveNotes });
    this.updateInitialData();
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
            activeNotes={this.state.activeNotes}
            onDeleteActive={this.onDeleteActiveHandler}
            moveToArchive={this.moveToArchiveHandler}
          />
          <ArchiveNotes
            archiveNotes={this.state.archiveNotes}
            onDeleteArchive={this.onDeleteArchiveHandler}
            moveToActive={this.moveToActiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NotesApp;
