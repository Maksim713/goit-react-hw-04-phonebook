import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import Section from './Section';
import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const didRender = useRef(false);

  useEffect(() => {
    let localContacts = localStorage.getItem('phonebookContacts');
    localContacts = localContacts ? JSON.parse(localContacts) : [];
    setContacts([...localContacts]);
  }, []);

  useEffect(() => {
    if (!didRender.current) {
      didRender.current = true;
      return;
    }
    window.localStorage.setItem('phonebookContacts', JSON.stringify(contacts));
  }, [contacts]);

  const pullFormData = data => {
    const nameExists = contacts.some(
      it => it.name.toLowerCase() === data.name.toLowerCase()
    );
    if (nameExists) {
      Notify.warning(`${data.name} is already in contacts.`);
      return;
    }

    setContacts(prev => [...prev, { ...data, id: nanoid() }]);
  };

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const deleteItem = deletedId => {
    setContacts(prev => prev.filter(({ id }) => id !== deletedId));
  };

  const filteredContacts = contacts.filter(it =>
    it.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={pullFormData} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onSearchInput={handleInputChange} />
        <ContactsList contacts={filteredContacts} onClickDelete={deleteItem} />
      </Section>
    </div>
  );
}

export default App;
