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
} from '../actions/actionTypes';

const initialState = {
  dogs: [],
  temperaments: [],
  error: {},
  dog: [],
  currentPage: 1,
  search: '',
  orderBy: 'name',
  direction: 'asc',
  origin: 'all',
  nature: 'all',
  natures: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_BREEDS:
      return {
        ...state
      }
    case GET_DOGS:
      return {
        ...state,
        dogs: payload
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload
      };
    case GET_DOG:
      return {
        ...state,
        dog: payload
      };
    case SET_DOG:
      return {
        ...state,
        dog: payload
      };
    case ERROR:
      return {
        ...state,
        error: payload
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: payload
      };
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: payload
      };
    case SET_DIRECTION:
      return {
        ...state,
        direction: payload
      };
    case SET_ORIGIN:
      return {
        ...state,
        origin: payload
      };
    case SET_NATURE:
      return {
        ...state,
        nature: payload
      };
    case SET_NATURES:
      return {
        ...state,
        natures: state.natures.includes(payload) ? state.natures.filter(nature => nature !== payload) : [ ...state.natures, payload]
      };
    default:
      return {
        ...state
      };
  }
}