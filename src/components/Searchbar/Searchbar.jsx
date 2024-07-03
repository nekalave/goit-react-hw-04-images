import css from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {

  const [searchBarValue, setSearchBarValue] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchBarValue(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchBarValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type='submit' className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          value={searchBarValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
