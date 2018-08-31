import _ from 'lodash';
import PropTypes from 'prop-types';

// common input tag props
export const inputPropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export const checkboxPropTypes = _.assign({}, inputPropTypes, {
  checked: PropTypes.bool,
  inline: PropTypes.bool,
});

export const radioButtonPropTypes = checkboxPropTypes;

export const checkboxGroupPropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onChange: PropTypes.func.isRequired,
  dts: PropTypes.string,
  inline: PropTypes.bool,
};

export const radioGroupPropTypes = _.assign({}, checkboxGroupPropTypes, {
  value: PropTypes.string.isRequired,
});
