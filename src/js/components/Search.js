import React, {useState} from 'react';

import {Header} from "./Header";
import {SearchForm} from "./SearchForm";
import {SearchResults} from "./SearchResults";

import '../../css/components/GoogleSearch.css';


export const Search = () => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (searchTerms) => {
    setQuery(searchTerms);
  };

  return(
    <div className="App">
      <Header />
      <main className="AppContent">
        <SearchForm
          onSubmit={handleFormSubmit}
        />
        { query &&
        <SearchResults
            key={Date.now()}
            query={query}
        />
      }
      </main>
    </div>
  )
}
