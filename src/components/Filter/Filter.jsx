import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { filterContact } from '../../redux/contactSlice';

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch(filterContact(event.target.value));
  };

  return (
    <Label>
      Find contact by name
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleChange}
        defaultValue={filter}
      />
    </Label>
  );
};

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0 8px 24px;
`;

const Input = styled.input`
  display: block;
  margin: 8px 0 0 8px;
  height: 32px;
  width: 220px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
`;
