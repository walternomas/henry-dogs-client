import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import dotenv from 'dotenv';
// dotenv.config();

const Ul = styled.ul`
  list-style: none;
  padding: 0 10px;
`;

const Li = styled.li`
  padding-bottom: 3px;
`;

const Card = styled.div`
  border: solid 2.5px black;
  margin: 13px;
  background-color: #b87741;
  border-radius: 6px;
  padding: 0.5rem;
`;

const svgStyle = {
  visibility: 'hidden',
  position: 'absolute'
}

export default function Dog({ dog }) {
  return (
    <>
      <Card>
        <div>
          <img src={dog.image === '' ? 'https://res.cloudinary.com/dvxnklc1e/image/upload/v1673812249/k0ohw3ej5yqnleq4ummi.jpg' : dog.image} alt={dog.name} width="250px" />
        </div>
        <Link to={`/dogs/${dog.id}`} className='bones'>
          <span>{dog.name}</span>
        </Link>
        <p>
          <strong>Weight: </strong>{dog.weight_min} - {dog.weight_max} kg.
        </p>
        <Ul>
          <Li key={Math.random(dog.id)}><strong>Temperaments: </strong></Li>
          <Li key={Math.random(dog.id)}>
            <Ul>
              {
                dog.temperament && dog.temperament.split(', ').map((t, i) => {
                  return (
                    <li key={Math.random(dog.id)}>{t}</li>
                  )
                })
              }
              {
                dog.temperaments && dog.temperaments.map((t) => {
                  return (
                    <li key={Math.random(dog.id)}>{t.name}</li>
                  )
                })
              }
            </Ul>
          </Li>
        </Ul>
      </Card>
      <svg style={svgStyle} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19-9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  )
}