import { SvgSymbol } from 'adslot-ui';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const defaultComponentClass = 'tag-component';

export const ActionButton = ({ onAction, id, actionIconSvgHref }) => (
  <span className="action-button" onClick={() => onAction(id)}>
    {actionIconSvgHref ? <SvgSymbol href={actionIconSvgHref} /> : <span className="action-icon">&#x2715;</span>}
  </span>
);

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIconSvgHref: PropTypes.string,
};

const Tag = ({ children, inverse, id, onAction, accent, baseClass, actionIconSvgHref, dts: customDts }) => {
  const classes = classnames([
    defaultComponentClass,
    {
      [`${baseClass}-inverse`]: inverse,
      [`${baseClass}-accent accent-${accent}`]: accent,
      [`${defaultComponentClass}-actionable`]: onAction,
      [`${baseClass}`]: baseClass !== defaultComponentClass,
    },
  ]);
  const dts = customDts || `tag-${id}`;

  return (
    <span className={classes} data-test-selector={dts}>
      {children}
      {onAction ? <ActionButton {...{ onAction, id, actionIconSvgHref }} /> : null}
    </span>
  );
};

Tag.displayName = 'TagComponent';

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  baseClass: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIconSvgHref: PropTypes.string,
  dts: PropTypes.string,
};

Tag.defaultProps = {
  id: 'default',
  baseClass: 'tag-component',
};

export default Tag;
