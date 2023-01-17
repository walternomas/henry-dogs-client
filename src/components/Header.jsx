import { NavLink } from "react-router-dom";

const svgStyle = {
  visibility: 'hidden',
  position: 'absolute'
}

export default function Header({ caption }) {
  return (
    <header>
      <NavLink
        to="/dogs/"
        className={({ isActive }) => (isActive ? 'activo titulo' : 'titulo')}
      ><h1>Henry Dogs</h1>
      </NavLink>
      <h1 className="titulo">{caption}</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dogs/add"
              className={({ isActive }) => (isActive ? 'is-active bone' : 'bone')}
            ><span>Add</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <svg style={svgStyle} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19-9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </header>
  )
}