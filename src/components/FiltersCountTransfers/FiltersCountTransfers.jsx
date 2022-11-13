import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setTransferFilter } from '../../redux/actions';

import filtersCountTransfersStyle from './FiltersCountTransfers.module.scss';

const FiltersCountTransfers = (props) => {
  const { transfersFilter, setTransferFilter } = props;
  const [statusAllTransfers, setStatusAllTransfers] = useState(true);

  const clickCheckBox = (e) => {
    const value = e.target.value;
    setTransferFilter({ ...transfersFilter, [value]: !transfersFilter[value] });
  };

  const changeStatusCheckBoxAll = (status) => {
    setStatusAllTransfers(status);
  };

  const uncheckAllCheckBox = () => {
    const newState = {};
    for (const key in transfersFilter) {
      newState[key] = false;
    }
    setTransferFilter(newState);
  };

  const checkAllCheckBox = () => {
    const newState = {};
    for (const key in transfersFilter) {
      newState[key] = true;
    }
    setTransferFilter(newState);
  };

  useEffect(() => {
    if (statusAllTransfers) {
      checkAllCheckBox();
    } else {
      for (const key in transfersFilter) {
        if (transfersFilter[key] !== true) {
          return;
        }
      }
      uncheckAllCheckBox();
    }
  }, [statusAllTransfers]);

  useEffect(() => {
    if (statusAllTransfers) {
      for (const key in transfersFilter) {
        if (transfersFilter[key] === false) {
          changeStatusCheckBoxAll(false);
          return;
        }
      }
    }

    if (!statusAllTransfers) {
      for (const key in transfersFilter) {
        if (transfersFilter[key] === false) {
          return;
        }
      }
      changeStatusCheckBoxAll(true);
      return;
    }
  }, [transfersFilter]);

  useEffect(() => {
    setStatusAllTransfers(true);
  }, []);

  return (
    <div
      className={`${filtersCountTransfersStyle['filters-count-transfer']} ${props.className ? props.className : null}`}
    >
      <p className={filtersCountTransfersStyle['title']}>Количество пересадок</p>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          name=""
          id=""
          value="all"
          className={filtersCountTransfersStyle['checkbox']}
          onChange={() => {
            setStatusAllTransfers((state) => !state);
          }}
          checked={statusAllTransfers && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>Все</span>
      </label>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          name=""
          id=""
          value="directFlight"
          className={filtersCountTransfersStyle['checkbox']}
          onChange={clickCheckBox}
          checked={transfersFilter.directFlight && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>Без пересадок</span>
      </label>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          name=""
          id=""
          className={filtersCountTransfersStyle['checkbox']}
          value="one"
          onChange={clickCheckBox}
          checked={transfersFilter.one && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>1 пересадка</span>
      </label>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          name=""
          id=""
          value="two"
          className={filtersCountTransfersStyle['checkbox']}
          onChange={clickCheckBox}
          checked={transfersFilter.two && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>2 пересадки</span>
      </label>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          name=""
          id=""
          value="three"
          className={filtersCountTransfersStyle['checkbox']}
          onChange={clickCheckBox}
          checked={transfersFilter.three && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>3 пересадки</span>
      </label>
    </div>
  );
};

FiltersCountTransfers.defaultProps = {
  transfersFilter: { directFlight: false, one: false, two: false, three: false },
  setTransferFilter: () => {},
};
FiltersCountTransfers.propTypes = {
  className: PropTypes.string,
  transfersFilter: PropTypes.object,
  setTransferFilter: PropTypes.func,
};

const mapsStateToProps = (state) => {
  return { transfersFilter: state.transfersFilter };
};
const mapsDispatchToProps = (dispatch) => {
  return {
    setTransferFilter: (transfers) => dispatch(setTransferFilter(transfers)),
  };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(FiltersCountTransfers);
