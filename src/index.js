import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { reducerSort, reducerTickets, reducerTransfer } from './redux/reducer';
import App from './components/App';
import { incBadRequest, requestSearchId, requestTickets, setErrorGetTickets } from './redux/actions';

const store = configureStore(
  {
    reducer: {
      sort: reducerSort,
      transfersFilter: reducerTransfer,
      tickets: reducerTickets,
    },
  },
  applyMiddleware(thunk),
);

const getSearchId = () => {
  store.dispatch(requestSearchId()).then(({ searchId }) => getAllTickets(searchId));
};

const getAllTickets = (searchId) => {
  store
    .dispatch(requestTickets(searchId))
    .then(() => {
      setTimeout(() => {
        const { tickets } = store.getState();
        if (tickets.isFetching) {
          getAllTickets(searchId);
          return;
        }
      }, 150);
    })
    .catch(() => {
      store.dispatch(incBadRequest());
      const { tickets } = store.getState();
      if (tickets.isFetching && tickets.countBadRequest < 10) {
        getAllTickets(searchId);
        return;
      }
      if (tickets.countBadRequest > 10) store.dispatch(setErrorGetTickets());
    });
};

getSearchId();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
