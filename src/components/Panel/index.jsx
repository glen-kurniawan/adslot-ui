import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SvgSymbol from '../SvgSymbol';
import './styles.scss';

class PanelComponent extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    dts: PropTypes.string,
    /**
     * shapeOf <a href="/svg-symbol">SVG Symbol</a> prop types.
     */
    icon: PropTypes.shape(SvgSymbol.propTypes),
    title: PropTypes.node.isRequired,
    isCollapsed: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  onHeaderClick = () => this.props.onClick(this.props.id);

  render() {
    const { className, children, dts, icon, isCollapsed, title } = this.props;
    const classesCombined = classnames(['panel-component', className, { collapsed: isCollapsed }]);

    return (
      <div className={classesCombined} data-test-selector={dts}>
        <div className="panel-component-header clearfix" onClick={this.onHeaderClick}>
          {icon ? <SvgSymbol href={icon.href} /> : null}
          {title}
        </div>
        <div className="panel-component-content">{children}</div>
      </div>
    );
  }
}

export default PanelComponent;
