import React from 'react';

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

  // document.querySelector('#inputSearch').addEventListener('keypress', event => {
  //   if(event.keyCode === 13) {
  //     document.querySelector('#searchClick').click();
  //   }
  // });


    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        document.querySelector('#searchClick').click();
      }
    }
  
  return (
    <>
      <div>
        <button onClick={fnBlankSearchClick}>Reset</button>
        <input
          id='inputSearch'
          type="text"
          placeholder="Enter a Breed Name..."
          defaultValue={search}
          onChange={fnSearch}
          onKeyDown={handleKeyDown}
        />
        <button id='searchClick' onClick={fnSearchClick}>Search</button>
      </div>
    </>
  )
}
