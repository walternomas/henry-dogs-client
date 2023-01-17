import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, setDog, setCurrentPage, setSearch, setOrderBy, setDirection, setOrigin, setNature, setNatures, getTemperaments } from '../redux/actions';
import Dog from './Dog';
import styled from 'styled-components';
import Header from './Header';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';
import { SyncLoader } from "react-spinners";
// import dotenv from 'dotenv';
// dotenv.config();

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: space-around;
  max-width: 70%;
  margin: auto;
`

const svgStyle = {
  visibility: 'hidden',
  position: 'absolute'
}

export default function Dogs() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  const search = useSelector((state) => state.search);
  const dogs = useSelector(state => state.dogs);
  const error = useSelector(state => state.error);

  const order_by = useSelector((state) => state.orderBy);
  const direction = useSelector((state) => state.direction);

  const origin = useSelector((state) => state.origin);
  const nature = useSelector((state) => state.nature);
  const natures = useSelector((state) => state.natures);
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs(search, order_by, direction, origin, nature, natures));
    dispatch(setDog()); // eslint-disable-next-line
  }, [dispatch, order_by, direction, origin, nature, natures])

  const handleSearch = (e) => dispatch(setSearch(e.target.value));
  const handleSearchBlank = () => dispatch(setSearch(''));
  const handleSearchClick = () => dispatch(getDogs(search, order_by, direction, origin, nature, natures));

  const handleOrderBy = (e) => dispatch(setOrderBy(e.target.value));
  const handleDirection = (e) => dispatch(setDirection(e.target.value));
  const handleOrigin = (e) => dispatch(setOrigin(e.target.value));
  const handleNature = (e) => dispatch(setNature(e.target.value));
  const handleNatures = (e) => dispatch(setNatures(e.target.value));

  if (dogs.length) {

    return (
      <>
        <Header caption="List of Dog Breeds" />
        <FilterBar
          order_by={order_by}
          direction={direction}
          origin={origin}
          nature={nature}
          natures={natures}
          temperaments={temperaments}
          fnOrder={handleOrderBy}
          fnDirection={handleDirection}
          fnOrigin={handleOrigin}
          fnNature={handleNature}
          fnNatures={handleNatures}
        />
        <SearchBar
          search={search}
          fnSearch={handleSearch}
          fnSearchClick={handleSearchClick}
          fnSearchBlank={handleSearchBlank}
        />

        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          currentPage={currentPage}
          paginado={paginado}
        />
        <Container>
          {
            currentDogs?.map(dog =>
              <Dog
                key={dog.id}
                dog={dog}
              />
            )
          }
        </Container>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          currentPage={currentPage}
          paginado={paginado}
        />

        <p>
          <Link to="/" className="bone"><span>Landing Page</span></Link>
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

  if (Object.keys(error).length) {
    return (
      <>
        <Header caption="List of Dog Breeds" />
        <FilterBar
          order_by={order_by}
          direction={direction}
          origin={origin}
          nature={nature}
          natures={natures}
          temperaments={temperaments}
          fnOrder={handleOrderBy}
          fnDirection={handleDirection}
          fnOrigin={handleOrigin}
          fnNature={handleNature}
          fnNatures={handleNatures}
        />
        <SearchBar
          search={search}
          fnSearch={handleSearch}
          fnSearchClick={handleSearchClick}
          fnSearchBlank={handleSearchBlank}
        />
        <h1>{error.message}</h1>
      </>
    );
  } else if (Object.keys(dogs).length === 0) {
    return (
      <>
        <Header caption="List of Dog Breeds" />
        <FilterBar
          order_by={order_by}
          direction={direction}
          origin={origin}
          nature={nature}
          natures={natures}
          temperaments={temperaments}
          fnOrder={handleOrderBy}
          fnDirection={handleDirection}
          fnOrigin={handleOrigin}
          fnNature={handleNature}
          fnNatures={handleNatures}
        />
        <SearchBar
          search={search}
          fnSearch={handleSearch}
          fnSearchClick={handleSearchClick}
          fnSearchBlank={handleSearchBlank}
        />
        <h1>Not found.</h1>
        {/* <SyncLoader color={'#FFFF01'} size={25} /> */}
      </>
    )
  } else {
    return (
      <SyncLoader color={'#FFFF01'} size={25} />
    );
  }

}