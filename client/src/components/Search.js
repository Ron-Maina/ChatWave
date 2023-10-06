import React from 'react'

function Search({ searchTerm, onSearchChange }) {
    return (
        <div className='input-style' id='searchbar'>
          <label className='input-label' htmlFor="search">Search...</label>
          <input
            className='input-field'
            type="text"
            id="search"
            placeholder="Type a name to search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      );
}

export default Search