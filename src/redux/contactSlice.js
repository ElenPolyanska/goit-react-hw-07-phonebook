import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    filterContact(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        console.log(action.payload);
        state.contacts.items.unshift(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const itemIndex = state.contacts.items.findIndex(
          contact => contact.id === action.payload
        );
        state.contacts.items.splice(itemIndex, 1);
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
  
});

export const { filterContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
