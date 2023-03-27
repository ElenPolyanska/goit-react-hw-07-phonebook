import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import styled from 'styled-components';

export const ContactList = () => {
  const { contacts, filter } = useSelector(state => state);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const normilizedFilter = filter.toLowerCase().trim();

    return contacts.items.filter(contact => {
      return contact.name.toLowerCase().includes(normilizedFilter);
    });
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {getVisibleContacts().map(contact => (
        <li key={contact.id}>
          <Item>
            <span>{contact.name}:</span>
            <span> {contact.phone}</span>

            <Button
              type="button"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </Button>
          </Item>
        </li>
      ))}
    </ul>
  );
};

const Item = styled.div`
  width: 460px;
  font-size: 18px;
  display: flex;

  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 6px 10px;
  margin: 4px;
  font-size: large;

  border: 1px solid black;
  border-radius: 4px;
  background-color: transparent;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover,
  :focus {
    background-color: #fc035e;
    color: white;
    border: 1px solid #fc035e;
  }
`;
