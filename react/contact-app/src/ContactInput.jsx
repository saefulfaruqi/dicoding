import React from "react";
class ContactInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tag: "",
    };

    this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
    this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onNameChangeEventHandler(event) {
    this.setState({ name: event.target.value });
  }

  onTagChangeEventHandler(event) {
    this.setState({ tag: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    this.props.addContact(this.state);
  }

  render() {
    return (
      <form className="contact-input" onSubmit={this.onSubmitEventHandler}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.onNameChangeEventHandler}
        />
        <input
          type="text"
          id="tag"
          placeholder="Tag"
          value={this.state.tag}
          onChange={this.onTagChangeEventHandler}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default ContactInput;
