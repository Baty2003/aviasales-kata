import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import filtersCountTransfersStyle from './FiltersCountTransfers.module.scss';

const FiltersCountTransfers = (props) => {
  const { filters, setFilter } = props;
  const keyFilters = Object.keys(filters);
  const [statusAllFilters, setStatusAllFilters] = useState(true);

  const clickCheckBox = (e) => {
    const value = e.target.value;
    setFilter({ ...filters, [value]: !filters[value] });
  };

  const changeStatusCheckBoxAll = (status) => {
    setStatusAllFilters(status);
  };

  const uncheckAllCheckBox = () => {
    const newState = {};
    for (const key in filters) {
      newState[key] = false;
    }
    setFilter(newState);
  };

  const checkAllCheckBox = () => {
    const newState = {};
    for (const key in filters) {
      newState[key] = true;
    }
    setFilter(newState);
  };

  const sklonenie = (number, txt = ['пересадка', 'пересадки', 'пересадок'], cases = [2, 0, 1, 1, 1, 2]) =>
    txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];

  useEffect(() => {
    if (statusAllFilters) {
      checkAllCheckBox();
    } else {
      for (const key in filters) {
        if (filters[key] !== true) {
          return;
        }
      }
      uncheckAllCheckBox();
    }
  }, [statusAllFilters]);

  useEffect(() => {
    if (statusAllFilters) {
      for (const key in filters) {
        if (filters[key] === false) {
          changeStatusCheckBoxAll(false);
          return;
        }
      }
    }

    if (!statusAllFilters) {
      for (const key in filters) {
        if (filters[key] === false) {
          return;
        }
      }
      changeStatusCheckBoxAll(true);
      return;
    }
  }, [filters]);

  useEffect(() => {
    setStatusAllFilters(true);
  }, []);

  return (
    <div
      className={`${filtersCountTransfersStyle['filters-count-transfer']} ${props.className ? props.className : null}`}
    >
      <p className={filtersCountTransfersStyle['title']}>Количество пересадок</p>
      <label className={filtersCountTransfersStyle['label']}>
        <input
          type="checkbox"
          value="all"
          className={filtersCountTransfersStyle['checkbox']}
          onChange={() => {
            setStatusAllFilters((state) => !state);
          }}
          checked={statusAllFilters && true}
        />
        <span className={filtersCountTransfersStyle['label-span']}>Все</span>
      </label>
      {keyFilters.map((keyTransferFilter) => {
        return (
          <label key={keyTransferFilter} className={filtersCountTransfersStyle['label']}>
            <input
              type="checkbox"
              value={keyTransferFilter}
              className={filtersCountTransfersStyle['checkbox']}
              onChange={clickCheckBox}
              checked={filters[keyTransferFilter] && true}
            />
            <span className={filtersCountTransfersStyle['label-span']}>
              {keyTransferFilter === '0'
                ? 'Без пересадок'
                : keyTransferFilter + ' ' + sklonenie(parseInt(keyTransferFilter))}
            </span>
          </label>
        );
      })}
    </div>
  );
};

FiltersCountTransfers.defaultProps = {
  setTransferFilter: () => {},
};
FiltersCountTransfers.propTypes = {
  className: PropTypes.string,
  transfersFilters: PropTypes.object,
  setTransferFilter: PropTypes.func,
};

export default FiltersCountTransfers;
