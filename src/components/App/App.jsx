import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "../ContactForm/ContactForm.jsx";
import Filter from "../Filter/Filter.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addNewContact = (name, number) => {
    const contactName = { name, number, id: shortid.generate() };
    const normalizedName = name.toLowerCase();
    const duplicateName = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (duplicateName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (name === "") {
      alert(`Please type your info in the field. It is empty.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contactName],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  updateFilter = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <>
        <div className={s.container}>
          <h1 className={s.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addNewContact} />
          <h2 className={s.title}>Contacts</h2>
          <Filter filter={filter} onChange={this.updateFilter} />
          <ContactList
            contacts={filteredContacts}
            onClick={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
