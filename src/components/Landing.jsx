import styled from 'styled-components';
import { NavLink } from "react-router-dom";

const svgStyle = {
  visibility: 'hidden',
  position: 'absolute'
}

const Title = styled.h1`
  color: #2e2e2e;
  font-size: 2.5em;
  text-align: center;
`;

export default function Landing() {
  return (
    <div className="App">
      <Title>Henry Dogs</Title>
      <NavLink to='/dogs/' className='bone'><span>Enter</span></NavLink>
      <svg style={svgStyle} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19-9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}