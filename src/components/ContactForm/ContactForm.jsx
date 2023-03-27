import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const contacts = useSelector(state => state.contacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      phone,
    };
    const saveContact = contacts.items.find(contact => contact.name === name);
    if (saveContact) {
      return alert('Contact is already added!');
    }
    dispatch(addContact(contact));
    reset(event);
  };

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onNumberChange = event => {
    setPhone(event.target.value);
  };

  const reset = event => {
    setPhone('');
    setName('');
    event.target.reset();
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onNameChange}
          />
        </Label>
        <Label htmlFor="phone">
          Number
          <Input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={onNumberChange}
          />
        </Label>
        <Button disabled={isLoading}>Add contact</Button>
      </Form>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.shape()),
};

const Form = styled.form`
  width: 460px;
  margin: 18px auto 18px 8px;
  padding: 14px 14px;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  display: block;
  margin: 8px 0 0 8px;
  height: 36px;
  width: 240px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button`
  margin: 8px 0 0 auto;
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: transparent;
  font-size: 18px;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border 250ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover,
  :focus {
    background-color: #02cfe6;
    color: white;
    border: 1px solid #04d4b2;
  }
`;
