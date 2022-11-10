import React from 'react';
import { format } from 'date-fns';
import { default as addDate } from 'date-fns/add';
import PropTypes from 'prop-types';

import cardFlightStyle from './CardFlight.module.scss';
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

  const getLogoAirLine = (codeAirline) => `//pics.avs.io/99/36/${codeAirline}.png`;

  return (
    <div className={`${cardFlightStyle['card-flight']} ${props.className ? props.className : null}`}>
      <div className={cardFlightStyle['top-card']}>
        <p className={cardFlightStyle['cost']}>{price}Р</p>
        <img src={getLogoAirLine(carrier)} alt="" className={cardFlightStyle['logo-airline']} />
      </div>
      <div className={cardFlightStyle['info-flight']}>
        {segments.map((segment, index) => {
          const { destination, duration, origin, date, stops } = segment;
          return (
            <table
              key={index}
              className={`${cardFlightStyle['table-info-flight']} ${cardFlightStyle['table-info-flight--mb10px']}`}
            >
              <tbody>
                <tr className={cardFlightStyle['tr']}>
                  <th className={cardFlightStyle['th']}>{`${destination}-${origin}`}</th>
                  <th className={cardFlightStyle['th']}>В пути</th>
                  <th className={cardFlightStyle['th']}>{stops.length + ' ' + sklonenie(stops.length)}</th>
                </tr>
                <tr className={cardFlightStyle['tr']}>
                  <td className={cardFlightStyle['td']}>{formatedTimeForCard(date, duration)}</td>
                  <td className={cardFlightStyle['td']}>{calculateDuration(duration)}</td>
                  <td className={cardFlightStyle['td']}>{stops.join(', ')}</td>
                </tr>
              </tbody>
            </table>
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
