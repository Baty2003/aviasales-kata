import PropTypes from 'prop-types';
import React from 'react';

import buttonStyle from './Button.module.scss';
const Button = (props) => {
  return (
    <button className={`${buttonStyle['button']} ${props.className ? props.className : ''}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
