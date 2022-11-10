import React from 'react';
import PropTypes from 'prop-types';

import CardFlight from '../CardFlight';

import listFlightsStyle from './ListFlights.module.scss';
const ListFlights = (props) => {
  const { items, loading, error } = props;

  return (
    <div className={`${listFlightsStyle['list-flight']} ${props.className ? props.className : null}`}>
      {loading && <div className={listFlightsStyle['loading']}></div>}
      {error && <div className={listFlightsStyle['error-message']}>Error loading tickets</div>}
      {items.map((item, index) => (
        <CardFlight key={index} className={listFlightsStyle['card-flight']} {...item} />
      ))}
    </div>
  );
};

ListFlights.defaultProps = {
  items: [],
  loading: false,
  error: false,
};

ListFlights.propsTypes = {
  className: PropTypes.string,
  item: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default ListFlights;
