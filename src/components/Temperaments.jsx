import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from '../redux/actions';
import styled from 'styled-components';

const Fieldset = styled.fieldset`
  background-color: #b87741;
  border: solid 2.5px black;
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  flex-shrink: 1;
`;

export default function Temperaments({ fn }) {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);
  const error = useSelector(state => state.error);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch])

  // const [expanded, setExpanded] = useState(false);
  const [letter, setLetter] = useState('A');
  const [selected, setSelected] = useState([]);

  const handleSelected = (e) => {
    const array = [...selected];
    if (array.indexOf(e.target.value) === -1) {
      // agregarlo
      array.push(e.target.value);
      setSelected(array);
    } else {
      // sacarlo
      setSelected(array.filter(a => a !== e.target.value));
    }
    fn(e);
  };

  // const toggleExpanded = () => {
  //   if (!expanded) {
  //     setExpanded(true);
  //   } else {
  //     setExpanded(false);
  //   }
  // };

  const checkLetter = (e) => {
    e.preventDefault();
    setLetter(e.target.value);
  };

  if (temperaments.length) {
    let letters = [];
    temperaments.forEach(t => {
      if (!letters.includes(t.name.substring(0, 1))) {
        letters.push(t.name.substring(0, 1));
      }
    });

    // const divStyle = {
    //   display: expanded ? 'flex' : 'none',
    // }
    return (
      <Fieldset>
        <legend><strong>Temperaments: </strong></legend>
        {/* <legend onClick={toggleExpanded}><strong>Temperaments: {expanded ? "🔼" : "🔽"}</strong></legend> */}
        <div className="content">
          {
            letters && letters.map(l => (
              <button
                key={l}
                name="letters"
                value={l}
                onClick={checkLetter}
              >{l}</button>
              // <label key={l}><input
              //   type="radio"
              //   name="letters"
              //   value={l}
              //   id={l}
              //   onChange={checkLetter}
              //   checked={l === letter}
              // />{l}</label>
            ))
          }
          {
            temperaments && temperaments.map(g => (
              // <div key={g.id} className="temperaments" style={divStyle}>
              <div key={g.id} className="temperaments" style={{
                display: g.name.substring(0, 1).includes(letter) || selected.includes(g.id) ? 'flex' : 'none'
              }}>
                <input
                  type="checkbox"
                  id={g.id}
                  name="temperaments"
                  value={g.id}
                  onChange={handleSelected}
                />
                <label htmlFor={g.id}>{g.name}</label>
              </div>
            ))
          }
        </div>
      </Fieldset>
    )
  }
  if (Object.keys(error).length) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    );
  } else {
    return (
      <>
        <em>Loading temperaments...</em>
      </>
    );
  }
}
