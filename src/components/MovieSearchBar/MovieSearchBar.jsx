import { useState } from 'react';

export default function MoviesSearchBar({ onSearchSumbit }) {

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      const searchQuery = event.target.elements.query.value.trim();
      if (!searchQuery) {
        alert('You have to write some search query!');
      } else {
        onSearchSumbit({ query: searchQuery });
      }
      event.target.reset();
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <input 
                type="text" 
                name="query"
            />
            <button type="submit">Search</button>
        </form>
    );
}