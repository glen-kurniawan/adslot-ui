import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Panel from '../Panel';

class Accordion extends React.PureComponent {
  static propTypes = {
    /**
     * render `data-test-selector` onto the component. It can be useful for testing.
     */
    dts: PropTypes.string,
    /**
     * onPanelClick(panelId) takes in a single parameter which is the id of the clicked panel.
     */
    onPanelClick: PropTypes.func,
    /**
     * <span>
     *  Accept an array of <a href="/panel-example">Panel</a> or
     *  <a href="/accordion-panel-example">Accordion.Panel</a>
     *  </span>
     */
    children: PropTypes.node,
    defaultActivePanelIds: PropTypes.arrayOf(PropTypes.string),
    /**
     * Determine how many Panels can be expanded, accepted value is a positive number, or <code>max</code> to have no restriction
     */
    maxExpand: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['max'])]),
  };

  static defaultProps = {
    maxExpand: 'max',
    defaultActivePanelIds: [],
  };

  state = {
    activePanelIds:
      this.props.maxExpand === 'max'
        ? this.props.defaultActivePanelIds
        : _.slice(this.props.defaultActivePanelIds, 0, this.props.maxExpand),
  };

  onPanelClick = panelId => {
    const { maxExpand } = this.props;

    if (_.includes(this.state.activePanelIds, panelId)) {
      // remove panelId out of the active list
      this.setState({ activePanelIds: _.without(this.state.activePanelIds, panelId) });
    } else {
      // drop panels from the beginning if max opened panels count is reached
      let newActivePanelIds = [...this.state.activePanelIds, panelId];
      if (maxExpand !== 'max' && newActivePanelIds.length > maxExpand) {
        newActivePanelIds = _.drop(newActivePanelIds, newActivePanelIds.length - maxExpand);
      }

      this.setState({ activePanelIds: newActivePanelIds });
    }

    if (this.props.onPanelClick) {
      this.props.onPanelClick(panelId);
    }
  };

  validateProps() {
    const { maxExpand } = this.props;

    // validate maxExpand value
    switch (true) {
      case _.isNumber(maxExpand) && maxExpand <= 0:
      case _.isString(maxExpand) && maxExpand !== 'max':
        throw new Error("maxExpand must be a positive number or 'max'");
      default:
        break;
    }
  }

  renderPanelFromChildren = child => {
    const { id, isCollapsed } = child.props;

    // prevent rendering if child is not an instance of Accordion.Panel
    if (child.type !== Panel) {
      return null;
    }

    // respects child.props.isCollapsed for controlled behaviour
    return React.cloneElement(child, {
      ...child.props,
      onClick: this.onPanelClick,
      isCollapsed: _.isNil(isCollapsed) ? !_.includes(this.state.activePanelIds, id) : isCollapsed,
    });
  };

  render() {
    const { children, dts } = this.props;
    this.validateProps();

    return (
      <Card.Container dts={dts}>
        <Card.Content fill>{React.Children.map(children, this.renderPanelFromChildren)}</Card.Content>
      </Card.Container>
    );
  }
}

Accordion.Panel = Panel;

export default Accordion;
