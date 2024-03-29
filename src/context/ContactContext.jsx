import { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState([]);

  //Local
  //const uri = 'http://localhost:5000/api/contacts/';

  //Azure
  const uri = 'https://b-contact-app.azurewebsites.net/api/contacts/';
  
  const fetchData = async () => {
    let res = await fetch(uri);
    let data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createContact = async (newContact) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    };

    await fetch(uri, requestOptions);

    fetchData();
  };

  const deleteContact = async (idContact) => {
    await fetch(`${uri}${idContact}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        createContact,
        deleteContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};