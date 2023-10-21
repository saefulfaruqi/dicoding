import React from "react";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  render() {
    return (
      <div>
        <h1>NotesApp</h1>
      </div>
    );
  }
}

export default NotesApp;
