import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';
import { Popover } from 'third-party';
import './styles.scss';

const HelpIconPopover = ({ children, id, placement }) => (
  <div {...expandDts(id)} className="help-icon-popover-component">
    <Popover trigger="hover" placement={placement} popoverContent={children}>
      <div className="help-icon-popover-component-trigger" />
    </Popover>
  </div>
);

HelpIconPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

HelpIconPopover.defaultProps = {
  placement: 'right',
};

export default HelpIconPopover;
