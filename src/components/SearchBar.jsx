import React from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
background-color: #55422c;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0 0 1rem 0;
`;

export default function SearchBar({ search, fnSearch, fnSearchClick, fnSearchBlank }) {

  const fnBlankSearchClick = async () => {
    document.querySelector('#inputSearch').value = '';
    try {
      await fnSearchBlank();;
      await document.querySelector('#searchClick').click();
    } catch (e) {
      console.error(e);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      document.querySelector('#searchClick').click();
    }
  }

  const searchStyle = {
    fontSize: '1.25rem',
    fontFamily: 'var(--font)',
    border: 'solid 2.5px black',
    borderLeftStyle: 'none',
    borderRightStyle: 'none'
  }

  const searchButtonRightStyle = {
    fontSize: '1.25rem',
    fontFamily: 'var(--font)',
    backgroundColor: 'var(--color)',
    borderRadius: '0 6px 6px 0',
    cursor: 'pointer',
    border: 'solid 2.5px black',
    borderLeftStyle: 'none'
  };

  const searchButtonLeftStyle = {
    fontSize: '1.25rem',
    fontFamily: 'var(--font)',
    backgroundColor: 'var(--color)',
    borderRadius: '6px 0 0 6px',
    cursor: 'pointer',
    border: 'solid 2.5px black',
    borderRightStyle: 'none'
  };

  return (
    <SearchDiv>
      <button
        onClick={fnBlankSearchClick}
        style={searchButtonLeftStyle}
      >Reset</button>
      <input
        id='inputSearch'
        type="text"
        placeholder="Enter a Breed Name..."
        defaultValue={search}
        onChange={fnSearch}
        onKeyDown={handleKeyDown}
        style={searchStyle}
      />
      <button
        id='searchClick'
        onClick={fnSearchClick}
        style={searchButtonRightStyle}
      >Search</button>
    </SearchDiv>
  )
}
