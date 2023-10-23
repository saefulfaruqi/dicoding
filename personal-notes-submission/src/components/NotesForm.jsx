import React from "react";
class NotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }
  onTitleChangeHandler(event) {
    this.setState({ title: event.target.value });
  }
  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value });
  }
  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.onAddNotesHandler(this.state);
  }
  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">Sisa Karakter</p>
          <input
            type="text"
            id="title"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
          />
          <textarea
            placeholder="Tuliskan catatanmu disini ..."
            id="body"
            type="text"
            value={this.state.body}
            onChange={this.onBodyChangeHandler}
            className="note-input__body"
          />
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NotesForm;
