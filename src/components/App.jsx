import React, { Component } from 'react';
//import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export class App extends Component {
  static propTypes = {};
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    this.state.contacts.filter(contact => contact.name === newContact.name)
      .length
      ? alert(`${newContact.name}: is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filterContacts = this.getFilterContacts();

    return (
      <Layout>
        <GlobalStyle />
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.changeFilter} value={this.state.filter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Layout>
    );
  }
}
