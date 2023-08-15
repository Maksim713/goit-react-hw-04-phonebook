import { useState } from 'react';
import InputField from '../InputField';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const initialValue = { name: '', number: '' };

function ContactForm({ onSubmit }) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue(initialValue);
    reset();
  };

  const reset = () => {
    setValue({ name: '', number: '' });
  };

  const { name, number } = value;

  return (
    <form className={css.container} onSubmit={handleFormSubmit}>
      <InputField
        label="Name"
        value={name}
        type="text"
        name="name"
        pattern="^[A-Za-z\u0080-\uFFFF ']+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
      />
      <InputField
        label="Number"
        value={number}
        type="tel"
        name="number"
        pattern="^(\+?[0-9.\(\)\-\s]*)$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
      />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
