import { Link, useParams } from "react-router-dom";
import React from 'react'
import Header from './Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDog } from '../redux/actions';
import styled from 'styled-components';
import { SyncLoader } from "react-spinners";
//import dotenv from 'dotenv';
//dotenv.config();

const Ul = styled.ul`
  list-style: none;
  padding: 0 10px;
`;

const Li = styled.li`
  padding-bottom: 3px;
`;

const Card = styled.div`
  border: solid 2.5px black;
  border-radius: 6px;
  padding: 10px;
  margin: 13px;
  background-color: #b87741;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const svgStyle = {
  visibility: 'hidden',
  position: 'absolute'
}

export default function DogDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector(state => state.dog);
  useEffect(() => {
    //dispatch(getDogs()) 
    dispatch(getDog(id)); // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Header caption="Breed Detail" />
      {
        dog.length ? (
          <>
            <Card key={dog[0].id}>
              <div>
                <img src={dog[0].image === '' ? 'https://res.cloudinary.com/dvxnklc1e/image/upload/v1673812249/k0ohw3ej5yqnleq4ummi.jpg' : dog[0].image} alt={dog[0].name} width="400px" />
              </div>
              <div>
                <div className="bone"><span>{dog[0].name}</span></div>
                <Ul>
                  <Li key={Math.random(dog[0].id)}><strong>Weight: </strong>{dog[0].weight_min} - {dog[0].weight_max} kg.</Li>
                  <Li key={Math.random(dog[0].id)}><strong>Height: </strong>{dog[0].height_min} - {dog[0].height_max} cm.</Li>
                  <Li key={Math.random(dog[0].id)}><strong>Life Span: </strong>{dog[0].life_span}</Li>
                  <Li key={Math.random(dog[0].id)}><strong>Temperaments: </strong>
                    {
                      dog[0].temperament && dog[0].temperament
                    }
                    {
                      dog[0].temperaments && dog[0].temperaments.map((t) => {
                        return (
                          <>{t.name}, </>
                        )
                      })
                    }
                  </Li>
                </Ul>
              </div>
            </Card>
            <p>
              <Link to="/dogs/" className="bone"><span>Back</span></Link>
            </p>
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
        ) : (
          <>
            <h1>Who let the dogs out?</h1>
            <SyncLoader color={'#FFFF01'} size={25} />
            <p>
              <Link to="/dogs/" className="bone"><span>Back</span></Link>
            </p>
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
    </>
  )
}
