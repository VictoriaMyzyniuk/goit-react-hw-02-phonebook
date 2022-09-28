import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Component } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(4).max(8).required(),
});

const initialValues = {
  name: '',
  number: '',
};

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

    const checkName = this.state.contacts.some(item =>
      item.name.toLowerCase().includes(contact.name.toLowerCase())
    );
    checkName
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...values, id: nanoid() }],
        }));
  };

  onFilterChange = e => {
    console.log(e.currentTarget.value);
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getNeddedCard = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteCard = idx => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idx),
    }));
  };

  render() {
    const neddedCards = this.getNeddedCard();
    return (
      <>
        <h1>Phonebook</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          <Form autoComplete="off">
            <label htmlFor="name">
              Name
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </label>
            <br />
            <label htmlFor="number">
              Number
              <Field type="tel" name="number" />
              <ErrorMessage name="number" component="div" />
            </label>
            <button type="submit">Add contact</button>
          </Form>
        </Formik>

        {this.state.contacts.length > 0 && <h2>Contacts</h2>}
        {this.state.contacts.length > 0 && (
          <Filter
            value={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        )}
        <ContactList
          // contacts={this.state.contacts}
          neddedCards={neddedCards}
          deleteCard={this.deleteCard}
        />
      </>
    );
  }
}
