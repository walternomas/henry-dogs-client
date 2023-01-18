import React, { useState } from 'react';
import styled from 'styled-components'

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

export default function FilterBar({ 
  order_by, direction, origin, nature, natures, temperaments,
  fnOrder, fnDirection, fnOrigin, fnNature, fnNatures }) {

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const divStyle = {
    display: expanded ? 'flex' : 'none',
  }

  return (
    <header>
      <Fieldset>
        <legend>Order & Direction: </legend>
        <div>
          <input
            type="radio"
            name="order"
            id="name"
            value="name"
            onChange={fnOrder}
            checked={order_by === 'name'}
          />
          <label htmlFor="name">Alphabetical</label>

          <input
            type="radio"
            name="order"
            id="weight_min"
            value="weight_min"
            onChange={fnOrder}
            checked={order_by === 'weight_min'}
          />
          <label htmlFor="weight_min">By Min Weight</label>

          <input
            type="radio"
            name="order"
            id="weight_max"
            value="weight_max"
            onChange={fnOrder}
            checked={order_by === 'weight_max'}
          />
          <label htmlFor="weight_max">By Max Weight</label>

          <input
            type="radio"
            name="direction"
            id="asc"
            value="asc"
            onChange={fnDirection}
            checked={direction === 'asc'}
          />
          <label htmlFor="asc">ASC</label>

          <input
            type="radio"
            name="direction"
            id="desc"
            value="desc"
            onChange={fnDirection}
            checked={direction === 'desc'}
          />
          <label htmlFor="desc">DESC</label>

        </div>
      </Fieldset>

      <Fieldset>
        <legend>Origin: </legend>
        <div>
          <input
            type="radio"
            name="origin"
            id="all"
            value="all"
            onChange={fnOrigin}
            checked={origin === 'all'}
          />
          <label htmlFor="all">all sources</label>
          <input
            type="radio"
            name="origin"
            id="api"
            value="api"
            onChange={fnOrigin}
            checked={origin === 'api'}
          />
          <label htmlFor="api">from theDogApi.com</label>
          <input
            type="radio"
            name="origin"
            id="db"
            value="db"
            onChange={fnOrigin}
            checked={origin === 'db'}
          />
          <label htmlFor="db">created here</label>
        </div>
      </Fieldset>

      <Fieldset>
        <legend>Temperaments: </legend>
        <div>
          <input
            type="radio"
            name="nature"
            id="all-included"
            value="all"
            onChange={fnNature}
            checked={nature === 'all'}
          />
          <label htmlFor="all-included">Any</label>
          <input
            type="radio"
            name="nature"
            id="selection"
            value="selection"
            onChange={fnNature}
            checked={nature === 'selection'}
          />
          <label htmlFor="selection">Selected</label>

          <Fieldset>
            <legend onClick={toggleExpanded}><strong>Temperaments: {expanded ? "🔼" : "🔽"}</strong></legend>
            <div className="content">
              {
                temperaments && temperaments.map(t => (
                  <div key={t.id} className="temperaments" style={divStyle}>
                    <input
                      type="checkbox"
                      id={t.id}
                      name="temperaments"
                      value={t.name}
                      onChange={fnNatures}
                      checked={natures.includes(t.name)}
                    />
                    <label htmlFor={t.id}>{t.name}</label>
                  </div>
                ))
              }
            </div>
          </Fieldset>

        </div>
      </Fieldset>

    </header>
  )
}
