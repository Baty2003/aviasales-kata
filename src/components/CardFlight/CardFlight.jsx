import React from 'react';
import { format } from 'date-fns';
import { default as addDate } from 'date-fns/add';
import PropTypes from 'prop-types';

import cardFlightStyle from './CardFlight.module.scss';
import logosAvialines from './assets/logos-avialines';

const CardFlight = (props) => {
  const { segments, carrier, price } = props;

  const sklonenie = (number, txt = ['пересадка', 'пересадки', 'пересадок'], cases = [2, 0, 1, 1, 1, 2]) =>
    txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];

  const formatedTimeForCard = (date, duration) => {
    const formatDate = 'HH:mm';
    const startTime = format(new Date(date), formatDate);
    const endTime = format(addDate(new Date(date), { minutes: duration }), formatDate);
    return `${startTime} – ${endTime}`;
  };

  const calculateDuration = (durationInMinutes) => {
    const hours = Math.trunc(durationInMinutes / 60);
    const minutes = durationInMinutes - hours * 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className={`${cardFlightStyle['card-flight']} ${props.className ? props.className : null}`}>
      <div className={cardFlightStyle['top-card']}>
        <p className={cardFlightStyle['cost']}>{price}Р</p>
        <img src={logosAvialines[carrier]} alt="" className={cardFlightStyle['logo-airline']} />
      </div>
      <div className={cardFlightStyle['info-flight']}>
        {segments.map((segment, index) => {
          const { destination, duration, origin, date, stops } = segment;
          return (
            <div key={index} className={cardFlightStyle['block']}>
              <div className={cardFlightStyle['piece']}>
                <span className={cardFlightStyle['head-piece']}>{`${destination}-${origin}`}</span>
                <span className={cardFlightStyle['info-piece']}>{formatedTimeForCard(date, duration)}</span>
              </div>
              <div className={cardFlightStyle['piece']}>
                <span className={cardFlightStyle['head-piece']}>В пути</span>
                <span className={cardFlightStyle['info-piece']}>{calculateDuration(duration)}</span>
              </div>
              <div className={cardFlightStyle['piece']}>
                <span className={cardFlightStyle['head-piece']}>{stops.length + ' ' + sklonenie(stops.length)}</span>
                <span className={cardFlightStyle['info-piece']}>{stops.join(', ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CardFlight.defaultProps = {
  segments: [],
  carrier: 'NONE',
  price: 0,
};

CardFlight.propsTypes = {
  className: PropTypes.string,
  segments: PropTypes.array,
  carrier: PropTypes.string,
  price: PropTypes.int,
};
export default CardFlight;
