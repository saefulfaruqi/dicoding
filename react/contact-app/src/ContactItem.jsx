import React, { Component } from "react";
import ContactItemBody from "./ContactItemBody";
import ContactItemImage from "./ContactItemImage";
import DeleteButton from "./DeleteButton";

class ContactItem extends Component {
  render() {
    const { imageUrl, name, tag, id, onDelete } = this.props;
    return (
      <div className="contact-item">
        <ContactItemImage imageUrl={imageUrl} />
        <ContactItemBody name={name} tag={tag} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    );
  }
}

export default ContactItem;
