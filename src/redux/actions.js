import {
  SET_SORT,
  SET_TRANSFER_FILTER,
  SET_STATUS_IS_FETCHING,
  SET_SEARCH_ID,
  SET_TICKETS,
  INC_BAD_REQUEST,
  SET_ERROR_GET_TICKETS,
} from './actionName';

const LOWCOST_SORT = 'lowcost';
const FAST_SORT = 'fast';
const OPTIMAL_SORT = 'optimal';

export const selectLowCostSort = () => {
  return { type: SET_SORT, sort: LOWCOST_SORT };
};
export const selectFastSort = () => {
  return { type: SET_SORT, sort: FAST_SORT };
};
export const selectOptimalSort = () => {
  return { type: SET_SORT, sort: OPTIMAL_SORT };
};

export const setTransferFilter = (transfers) => {
  return { type: SET_TRANSFER_FILTER, transfers: transfers };
};

export const setStatusIsFetching = (status) => {
  return { type: SET_STATUS_IS_FETCHING, isFetching: status };
};

export const setSearchId = (searchId) => {
  return { type: SET_SEARCH_ID, searchId };
};

export const setTickets = (tickets) => {
  return { type: SET_TICKETS, tickets };
};

export const incBadRequest = () => {
  return { type: INC_BAD_REQUEST };
};

export const setErrorGetTickets = () => {
  return { type: SET_ERROR_GET_TICKETS };
};

export const requestSearchId = () => (dispatch) => {
  setStatusIsFetching(true);
  return fetch('https://front-test.dev.aviasales.ru/search')
    .then(
      (response) => response.json(),
      (error) => console.log(error),
    )
    .then(({ searchId }) => dispatch(setSearchId(searchId)));
};

export const requestTickets = (searchId) => (dispatch) => {
  return fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
    .then((response) => response.json())
    .then(({ tickets, stop }) => {
      dispatch(setTickets(tickets));
      dispatch(setStatusIsFetching(!stop));
    });
};
