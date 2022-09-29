import { Component } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const dublicateContact = this.findDublicateContact(
      contact,
      this.state.contacts
    );
    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...values, id: nanoid() }],
        }));
  };

  findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  onFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getNeeddedCard = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteCard = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const neddedCards = this.getNeeddedCard();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        {!!this.state.contacts.length && (
          <>
            <h2>Contacts</h2>
            <Filter
              value={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
          </>
        )}

        <ContactList neddedCards={neddedCards} deleteCard={this.deleteCard} />
      </Container>
    );
  }
}
