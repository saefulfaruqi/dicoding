import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };

    this.onTitleSearchHandler = this.onTitleSearchHandler.bind(this);
  }

  onTitleSearchHandler(event) {
    this.setState({ search: event.target.value });
    this.props.searchByTitle(event.target.value);
  }

  render() {
    // console.log(this.props, "header");
    return (
      <div className="note-app__header">
        <h1>Notes</h1>
        <div className="note-search">
          <input
            type="text"
            id="search"
            value={this.state.search}
            onChange={this.onTitleSearchHandler}
            placeholder="Cari catatan ..."
          />
        </div>
      </div>
    );
  }
}

export default Header;
