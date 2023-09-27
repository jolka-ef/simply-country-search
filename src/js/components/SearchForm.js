import React, {useRef, useState, useEffect} from 'react';

import {Input} from './Input'
import '../../css/components/SearchForm.css'
import {Button} from "./Button";

export const SearchForm = (props) => {

  const form = useRef();
  const {onSubmit} = props;

  const [searchText, setSearchText] = useState('');

  const getValues = (form) => {
    const current = form.current;
    const name = current.name.value;

    return (name)
  };

  // Read the values from localStorage on the initial page load
  useEffect(() => {
    if (localStorage.lastSearchText) {
      setSearchText(localStorage.lastSearchText);
      onSubmit(localStorage.lastSearchText);
    }
  }, []);

  return (
    <div role='search'>
      <form
        className="Form"
        method="get"
        ref={form}
        onSubmit={
          event => {
            event.preventDefault();
            const name = getValues(form);
            localStorage.lastSearchText = name
            onSubmit(name);
          }
        }>

          <Input
            ariaLabel='Search for countries by name'
            value={searchText}
            inputClass='Form-input'
            labelClass='Form-label'
            label='Name'
            name='name'
            onChange={event => setSearchText(event.target.value)}
            type='search'
          />

          <Button
            name='Search'
            type='submit'
          />

      </form>
    </div>
  )
};
