import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FiltersCountTransfers } from '../FiltersCountTransfers';
import { FiltersFlights } from '../FiltersFlights';
import { Button } from '../Button';
import { ListFlights } from '../ListFlights';

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
    const {
      sortTicket,
      tickets,
      filters: { directFlight, one, two, three },
    } = props;
    if (!tickets.length) return [];

    let newArrTickets = [];

    if (!checkFiltersTrue()) {
      if (directFlight) newArrTickets = newArrTickets.concat(filterForTransferCount(tickets, 0));
      if (one) newArrTickets = newArrTickets.concat(filterForTransferCount(tickets, 1));
      if (two) newArrTickets = newArrTickets.concat(filterForTransferCount(tickets, 2));
      if (three) newArrTickets = newArrTickets.concat(filterForTransferCount(tickets, 3));
      newArrTickets = [...new Set(newArrTickets)];
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

  const filterForTransferCount = (arr, stopsCount) => {
    return arr.filter((ticket) => {
      let flag = false;
      ticket.segments.forEach((elem) => {
        if (elem.stops.length === stopsCount) {
          flag = true;
          return;
        }
      });
      return flag;
    });
  };

  const checkFiltersTrue = () => {
    for (const key in props.filters) {
      if (!props.filters[key]) return false;
    }
    return true;
  };

  const checkFiltersFalse = () => {
    for (const key in props.filters) {
      if (props.filters[key]) return false;
    }
    return true;
  };

  const { loading, error } = props;

  return (
    <main>
      <section className={mainStyle['flex']}>
        <FiltersCountTransfers className={mainStyle['filters-count-transfers']} />
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
    filters: state.transfersFilter,
    error: state.tickets.error,
  };
};
export default connect(mapsStateToProps)(Main);
