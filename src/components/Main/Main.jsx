import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FiltersCountTransfers } from '../FiltersCountTransfers';
import { FiltersFlights } from '../FiltersFlights';
import { Button } from '../Button';
import { ListFlights } from '../ListFlights';
import { setTransferFilter } from '../../redux/actions';

import mainStyle from './Main.module.scss';

const Main = (props) => {
  const ADD_TICKETS_SHOW = 10;
  const [countShowCard, setCountShowCard] = useState(10);

  const sortLowPrice = (a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  };

  const sortFastDuration = (a, b) => {
    const durationA = a.segments.reduce((acc, currentSegment) => {
      acc += currentSegment.duration;
      return acc;
    }, 0);
    const durationB = b.segments.reduce((acc, currentSegment) => {
      acc += currentSegment.duration;
      return acc;
    }, 0);
    if (durationA < durationB) {
      return -1;
    }
    if (durationA > durationB) {
      return 1;
    }
    return 0;
  };

  const sortAndFilterTickets = () => {
    const { sortTicket, tickets, transferFilters } = props;
    if (!tickets.length) return [];

    let newArrTickets = [];

    if (checkFiltersFalse()) {
      newArrTickets = [];
    } else if (!checkFiltersTrue()) {
      newArrTickets = filterForTransferCount(tickets, transferFilters);
    } else {
      newArrTickets = [...tickets];
    }

    if (sortTicket === 'lowcost') {
      newArrTickets.sort(sortLowPrice);
    } else if (sortTicket === 'fast') {
      newArrTickets.sort(sortFastDuration);
    }
    return newArrTickets.slice(0, countShowCard);
  };

  const filterForTransferCount = (arr, filters = {}) => {
    const arrFilter = arr.filter((ticket) => {
      let flag = true;
      const countStopsArr = ticket.segments.map((segment) => segment.stops.length);
      countStopsArr.forEach((countStops) => {
        if (!filters[`${countStops}`]) {
          flag = false;
          return;
        }
      });

      return flag;
    });
    return arrFilter;
  };

  const checkFiltersTrue = () => {
    for (const key in props.transferFilters) {
      if (!props.transferFilters[key]) return false;
    }
    return true;
  };

  const checkFiltersFalse = () => {
    for (const key in props.transferFilters) {
      if (props.transferFilters[key]) return false;
    }
    return true;
  };

  const { loading, error, transferFilters, setTransferFilter } = props;

  return (
    <main>
      <section className={mainStyle['flex']}>
        <FiltersCountTransfers
          className={mainStyle['filters-count-transfers']}
          filters={transferFilters}
          setFilter={setTransferFilter}
        />
        <div className={mainStyle['content']}>
          <FiltersFlights />
          <ListFlights
            className={mainStyle['list-flight']}
            loading={checkFiltersFalse() ? false : loading}
            items={sortAndFilterTickets()}
            error={error}
          />
          <Button
            className={mainStyle['button']}
            onClick={() => setCountShowCard((state) => state + ADD_TICKETS_SHOW)}
            ariaLabel="Показать больше билетов"
          >
            {checkFiltersFalse() ? 'Вы не выбрали ни одного фильтра' : `Показать еще ${ADD_TICKETS_SHOW} билетов`}
          </Button>
        </div>
      </section>
    </main>
  );
};
const mapsStateToProps = (state) => {
  return {
    tickets: state.tickets.items,
    loading: state.tickets.isFetching,
    sortTicket: state.sort,
    transferFilters: state.transfersFilter,
    error: state.tickets.error,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    setTransferFilter: (transfers) => dispatch(setTransferFilter(transfers)),
  };
};
export default connect(mapsStateToProps, mapsDispatchToProps)(Main);
