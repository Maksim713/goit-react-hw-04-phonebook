import PropTypes from 'prop-types';
import InputField from '../InputField';
import css from './Filter.module.css';

function Filter({ filter, onSearchInput }) {
  return (
    <div className={css.container}>
      <InputField
        label="Find contacts by name"
        value={filter}
        type="text"
        name="filter"
        onChange={onSearchInput}
      />
    </div>
  );
}

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onSearchInput: PropTypes.func.isRequired,
};
