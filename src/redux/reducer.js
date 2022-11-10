/* eslint-disable indent */

import {
  SET_SORT,
  SET_TRANSFER_FILTER,
  SET_STATUS_IS_FETCHING,
  SET_SEARCH_ID,
  SET_TICKETS,
  INC_BAD_REQUEST,
  SET_ERROR_GET_TICKETS,
} from './actionName';

const initialStateTransers = {
  directFlight: false,
  one: false,
  two: false,
  three: false,
};

const inititalStateTickets = {
  searchId: null,
  isFetching: true,
  error: false,
  countBadRequest: 0,
  items: [],
};

export const reducerTickets = (state = inititalStateTickets, action) => {
  switch (action.type) {
    case SET_STATUS_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.searchId };
    case SET_TICKETS:
      return { ...state, items: [...action.tickets, ...state.items] };
    case INC_BAD_REQUEST:
      return { ...state, countBadRequest: state.countBadRequest + 1 };
    case SET_ERROR_GET_TICKETS:
      return { ...state, error: true };
    default:
      return state;
  }
};

export const reducerSort = (state = 'lowcost', action) => {
  switch (action.type) {
    case SET_SORT:
      return action.sort;
    default:
      return state;
  }
};

export const reducerTransfer = (state = initialStateTransers, action) => {
  switch (action.type) {
    case SET_TRANSFER_FILTER:
      return action.transfers;
    default:
      return state;
  }
};
