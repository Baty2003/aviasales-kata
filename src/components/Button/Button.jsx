import PropTypes from 'prop-types';
import React from 'react';

import buttonStyle from './Button.module.scss';
const Button = (props) => {
  const { className, onClick, ariaLabel, children } = props;
  return (
    <button
      className={`${buttonStyle['button']} ${className ? className : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
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
