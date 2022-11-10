import React from 'react';
import PropsTypes from 'prop-types';

import radioButtonStyle from './RadioButton.module.scss';
const RadioButton = (props) => {
  const { className, name, onChange, value, selected } = props;
  return (
    <label className={`${radioButtonStyle['radio-button']} ${className ? className : ''}`}>
      <input
        className={radioButtonStyle['button']}
        type="radio"
        name={name}
        onChange={onChange}
        value={value}
        checked={selected}
      />
      <span className={radioButtonStyle['text']}>{value}</span>
    </label>
  );
};

RadioButton.defaultProps = {
  onChange: () => {},
  value: 'NONE',
  selected: false,
  name: 'NONE',
};

RadioButton.propsTypes = {
  onChange: PropsTypes.func,
  value: PropsTypes.string,
  selected: PropsTypes.bool,
  name: PropsTypes.string,
};
export default RadioButton;
