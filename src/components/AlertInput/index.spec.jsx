/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import AlertInput from '.';
import Popover from '../Popover';

describe('AlertInput', () => {
  const initialState = {
    isFocused: false,
    isPopoverVisible: false,
  };

  describe('handleMouseEnter()', () => {
    it('should set `isPopoverVisible` to true if alert message exists', () => {
      const wrapper = shallow(<AlertInput alertMessage="Hello" />);
      wrapper.instance().handleMouseEnter();
      expect(wrapper.state()).to.eql({
        isFocused: false,
        isPopoverVisible: true,
      });
    });

    it('should not set `isPopoverVisible` to true if no alert message exists', () => {
      const wrapper = shallow(<AlertInput />);
      wrapper.instance().handleMouseEnter();
      expect(wrapper.state()).to.eql(initialState);
    });
  });

  describe('handleMouseLeave()', () => {
    it('should set `isPopoverVisible` to false', () => {
      const wrapper = shallow(<AlertInput alertMessage="Hello" />);
      wrapper.setState({ isPopoverVisible: true });
      wrapper.instance().handleMouseLeave();

      expect(wrapper.state('isPopoverVisible')).to.equal(false);
    });
  });

  describe('handleInputFocus()', () => {
    it('should set `isFocused` to true, and `isPopoverVisible` if there is an alert message', () => {
      const component = shallow(<AlertInput alertMessage="Hello" />);
      const inputElement = component.find('.aui--alert-input__input');
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      inputElement.simulate('focus', focusEvent);
      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: true,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
    });

    it('should set `isFocused` to true, but not `isPopoverVisible` if no alert message', () => {
      const component = shallow(<AlertInput />);
      const inputElement = component.find('.aui--alert-input__input');
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      inputElement.simulate('focus', focusEvent);
      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: false,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
    });

    it('should call prop `onFocus` if exists', () => {
      const onFocusSpy = sinon.spy();
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      const component = shallow(<AlertInput onFocus={onFocusSpy} />);
      const inputElement = component.find('.aui--alert-input__input');

      inputElement.simulate('focus', focusEvent);

      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: false,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
      expect(onFocusSpy.callCount).to.equal(1);
    });
  });

  describe('handleInputBlur ()', () => {
    it('should set `isFocused` and `isPopoverVisible` to false', () => {
      const component = shallow(<AlertInput />);
      const inputElement = component.find('.aui--alert-input__input');
      const focusEvent = {
        target: {
          select: _.noop,
        },
      };
      inputElement.simulate('focus', focusEvent);
      inputElement.simulate('blur');
      expect(component.state()).to.eql(initialState);
    });

    it('should call `onBlur` if exists', () => {
      const onBlurSpy = sinon.spy();
      const component = shallow(<AlertInput onBlur={onBlurSpy} />);
      const inputElement = component.find('.aui--alert-input__input');
      inputElement.simulate('blur');
      expect(onBlurSpy.callCount).to.equal(1);
    });
  });

  describe('render()', () => {
    it('should render with input props', () => {
      const props = {
        value: 100,
        type: 'number',
        min: 0,
        placeholder: 'Type a number',
        onValueChange: _.noop,
        onBlur: _.noop,
      };
      const wrapper = shallow(<AlertInput {...props} />);
      expect(wrapper.find('.aui--alert-input')).to.have.length(1);
      const componentWrapper = wrapper.find('.aui--alert-input');
      expect(componentWrapper.prop('onMouseEnter')).to.be.a('function');
      expect(componentWrapper.prop('onMouseLeave')).to.be.a('function');
      expect(componentWrapper.children()).to.have.length(1);

      const inputElement = wrapper.find('.aui--alert-input__input');
      expect(inputElement.prop('type')).to.equal('number');
      expect(inputElement.prop('min')).to.equal(0);
      expect(inputElement.prop('placeholder')).to.equal('Type a number');
      expect(inputElement.prop('value')).to.equal(100);
      expect(inputElement.prop('onChange')).to.be.a('function');
      expect(inputElement.prop('onFocus')).to.be.a('function');
      expect(inputElement.prop('onBlur')).to.be.a('function');
    });

    it('should also render with default props', () => {
      const wrapper = shallow(<AlertInput alertMessage="test" />);
      wrapper.setState({ isPopoverVisible: true });

      expect(wrapper.find('.aui--alert-input').hasClass('success')).to.equal(true);
      expect(wrapper.find(Popover.WithRef).prop('placement')).to.equal('bottom');
    });

    it('should render with addons', () => {
      const props = {
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      const wrapper = shallow(<AlertInput {...props} />);
      const componentWrapper = wrapper.find('.aui--alert-input');
      expect(componentWrapper.children()).to.have.length(3);

      const prefixElement = componentWrapper.childAt(0);
      expect(prefixElement.text()).to.equal('$');

      const suffixElement = componentWrapper.childAt(2);
      expect(suffixElement.text()).to.equal('.00');
    });

    it('should render with disabled input', () => {
      const props = {
        value: 10000,
        disabled: true,
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      const wrapper = shallow(<AlertInput {...props} />);

      const componentWrapper = wrapper.find('.aui--alert-input');
      expect(componentWrapper.children()).to.have.length(3);

      const prefixElement = componentWrapper.childAt(0);
      expect(prefixElement.text()).to.equal('$');

      const suffixElement = componentWrapper.childAt(2);
      expect(suffixElement.text()).to.equal('.00');

      expect(wrapper.find('.aui--alert-input--disabled')).to.have.lengthOf(1);
    });

    it('should render with alert status', () => {
      const props = {
        alertStatus: 'error',
      };
      const wrapper = shallow(<AlertInput {...props} />);
      const componentWrapper = wrapper.find('.aui--alert-input');
      expect(componentWrapper.prop('className')).to.equal('aui--alert-input error');
    });

    it('should set correct theme for popover', () => {
      const props = {
        alertStatus: 'error',
        alertMessage: 'something is wrong',
      };
      const wrapper = shallow(<AlertInput {...props} />);
      wrapper.setState({ isPopoverVisible: true });

      expect(wrapper.find(Popover.WithRef).prop('theme')).to.equal('error');

      wrapper.setProps({ alertStatus: 'warning' });
      expect(wrapper.find(Popover.WithRef).prop('theme')).to.equal('warn');
    });

    it('should set correct popoverPlacement position for popover', () => {
      const props = {
        popoverPlacement: 'left',
        alertMessage: 'something is wrong',
      };
      const wrapper = shallow(<AlertInput {...props} />);
      wrapper.setState({ isPopoverVisible: true });

      expect(wrapper.find(Popover.WithRef).prop('placement')).to.equal('left');
    });
  });
});
/* eslint-enable lodash/prefer-lodash-method */
