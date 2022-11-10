import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { RadioButton } from '../RadioButton';
import * as actions from '../../redux/actions';

import filtresFlightStyle from './FiltersFlights.module.scss';

const FiltersFlights = (props) => {
  const { selectFastSort, selectLowCostSort, selectOptimalSort, sort } = props;
  return (
    <div className={filtresFlightStyle['filters-flights']}>
      <RadioButton
        value={'Самый дешевый'}
        name={'filters-flights'}
        className={filtresFlightStyle['button-left']}
        onChange={selectLowCostSort}
        selected={sort === 'lowcost' ? true : false}
      />
      <RadioButton
        value={'Самый быстрый'}
        name={'filters-flights'}
        onChange={selectFastSort}
        selected={sort === 'fast' ? true : false}
      />
      <RadioButton
        value={'Оптимальный'}
        name={'filters-flights'}
        className={filtresFlightStyle['button-right']}
        onChange={selectOptimalSort}
        selected={sort === 'optimal' ? true : false}
      />
    </div>
  );
};
FiltersFlights.defaultProps = {
  selectFastSort: () => {},
  selectLowCostSort: () => {},
  selectOptimalSort: () => {},
  sort: 'optimal',
};

FiltersFlights.propTypes = {
  selectFastSort: PropTypes.func,
  selectLowCostSort: PropTypes.func,
  selectOptimalSort: PropTypes.func,
  sort: PropTypes.string,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(FiltersFlights);
