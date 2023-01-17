import {
  GET_BREEDS,
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOG,
  SET_DOG,
  ERROR,
  SET_CURRENT_PAGE,
  SET_SEARCH,
  SET_ORDER_BY,
  SET_DIRECTION,
  SET_ORIGIN,
  SET_NATURE,
  SET_NATURES
} from './actionTypes';
import axios from 'axios';

export function getBreeds(){
  return (dispatch) => {
    dispatch({
      type: GET_BREEDS
    })
  }
}

export function getDogs(name = '', order_by = 'name', direction = 'asc', origin = 'all', nature = 'all', natures = []) {
  (name && name.trim() !== '') ? name = `?name=${name}` : name = '';
  return async (dispatch) => {
    try {
      const response = await axios(`/dogs${name}`);
      let dogs = response.data;
      if (dogs.length > 0) {
        // DB
        let dogsDB = dogs.filter((dog) => dog.id.toString().includes('-'));
        // filtro por temperamentos
        if (nature !== 'all') {
          if (natures.length > 0) {
            natures.forEach(n => {
              if (dogsDB.length > 0) {
                dogsDB = dogsDB.filter((dog) => dog.temperaments.filter((t) => t.name === n).length)
              }
            });
          } else {
            dogsDB = [];
          }
        }
        // API
        let dogsAPI = dogs.filter((dog) => !dog.id.toString().includes('-'));
        // filtro por temperamentos
        if (nature !== 'all') {
          if (natures.length > 0) {
            natures.forEach(n => {
              if (dogsAPI.length > 0) {
                dogsAPI = dogsAPI.filter((dog) => dog.temperament.includes(n))
              }
            });
          } else {
            dogsAPI = [];
          }
        }
        // filtro por origen
        if (origin === 'db') {
          dogs = dogsDB;
        }
        if (origin === 'api') {
          dogs = dogsAPI;
        }
        if (origin === 'all') {
          dogs = [...dogsDB, ...dogsAPI];
        }
        // si queda algo los ordeno
        if (dogs.length > 0) {
          dogs = dogs.sort(function (a, b) {
            const the_a = (order_by === 'name') ? a[order_by] : Math.ceil(a[order_by]);
            const the_b = (order_by === 'name') ? b[order_by] : Math.ceil(b[order_by]);
            if ((direction === 'asc' ? the_a > the_b : the_b > the_a)) {
              return 1;
            }
            if ((direction === 'asc' ? the_a < the_b : the_b < the_a)) {
              return -1;
            }
            return 0;
          });
        }
      }
      dispatch({
        type: GET_DOGS,
        payload: dogs
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  }
}

export function getTemperaments() {
  return async (dispatch) => {
    try {
      const response = await axios(`/temperaments`);
      const temperaments = response.data;
      // for(let i=0; i<temperaments.length; i++){
      //   temperaments[i].checked = false;
      // }
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  }
}

export function getDog(id) {
  return async (dispatch) => {
    try {
      const response = await axios(`/dogs/${id}`);
      const dog = response.data;
      dispatch({
        type: GET_DOG,
        payload: dog
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  }
}

export function setDog() {
  return async (dispatch) => {
    dispatch({
      type: SET_DOG,
      payload: []
    })
  }
}

export function setCurrentPage(id) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: id
    })
  }
}

export function setSearch(name) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: name
    })
  }
}

export function setOrderBy(name) {
  return (dispatch) => {
    dispatch({
      type: SET_ORDER_BY,
      payload: name
    })
  }
}

export function setDirection(name) {
  return (dispatch) => {
    dispatch({
      type: SET_DIRECTION,
      payload: name
    })
  }
}

export function setOrigin(name) {
  return (dispatch) => {
    dispatch({
      type: SET_ORIGIN,
      payload: name
    })
  }
}

export function setNature(name) {
  return (dispatch) => {
    dispatch({
      type: SET_NATURE,
      payload: name
    })
  }
}

export function setNatures(name) {
  return (dispatch) => {
    dispatch({
      type: SET_NATURES,
      payload: name
    })
  }
}
