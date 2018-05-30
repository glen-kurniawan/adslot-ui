import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const mapPropsToState = (props, state) => {
  const tempState = _.cloneDeep(state);
  if (props.value) {
    _.forOwn(tempState.value, (value, key) => {
      tempState.value[key] = props.value.indexOf(key) !== -1;
    });
  }
  return tempState;
};

class CheckboxGroup extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return mapPropsToState(nextProps, prevState);
  }

  constructor(props) {
    super(props);
    this.state = { value: {} };
    React.Children.map(this.props.children, child => {
      this.state.value[child.props.value] = false;
    });
    if (this.props.value) {
      this.state = mapPropsToState(this.props, this.state);
    }
    this.renderChildren = this.renderChildren.bind(this);
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    const checkboxValue = event.target.value;
    this.setState(prevState => {
      const tempValue = _.cloneDeep(prevState.value);
      tempValue[checkboxValue] = !tempValue[checkboxValue];
      if (this.props.onChange) {
        this.props.onChange(tempValue, event, this.props.name);
      }
      return { value: tempValue };
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        name: this.props.name,
        checked: this.state.value[child.props.value],
        onChange: (...args) => {
          if (child.props.onChange) child.props.onChange(...args);
          this.onChangeDefault(...args);
        },
      })
    );
  }

  render() {
    const classes = `checkbox-group ${this.props.className}`;
    return <div className={classes}>{this.renderChildren()}</div>;
  }
}

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckboxGroup;