/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/lib/Button';
import Spinner from '../Spinner';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const adslotButtonPropTypes = {
  inverse: PropTypes.bool,
  dts: PropTypes.string,
  isLoading: PropTypes.bool,
};

const Button = props => {
  const { inverse, children, dts, className, isLoading, disabled } = props;
  const baseClass = 'aui--button';
  const classes = classNames(baseClass, className, {
    'btn-inverse': inverse && !/btn-inverse/.test(className),
  });

  const renderSpinner = () =>
    isLoading ? (
      <div className="spinner-container">
        <Spinner size={_.includes(['lg', 'large'], props.bsSize) ? 'medium' : 'small'} />
      </div>
    ) : null;

  return (
    <BootstrapButton
      {..._.omit(props, _.keys(adslotButtonPropTypes))}
      disabled={isLoading || disabled}
      className={classes}
      {...expandDts(dts)}
    >
      {renderSpinner()}
      <div className={isLoading ? 'aui--button-children-container' : null}>{children}</div>
    </BootstrapButton>
  );
};

Button.propTypes = { ...adslotButtonPropTypes, ...BootstrapButton.propTypes };

Button.defaultProps = {
  inverse: false,
  isLoading: false,
};

export default Button;
