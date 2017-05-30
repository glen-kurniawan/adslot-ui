import _ from 'lodash';
import React, { PropTypes } from 'react';
import BreadcrumbNodeComponent from 'components/alexandria/Breadcrumb/Node';
import './styles.scss';

const BreadcrumbComponent = ({ nodes, onClick }) => {
  const baseClass = 'breadcrumb-component';

  if (nodes.length === 0) {
    return <div className={baseClass} />;
  }

  return (
    <div className={baseClass}>
      <BreadcrumbNodeComponent
        isLast={false}
        node={{ id: 'all', label: 'All' }}
        onClick={onClick}
      />
      {
        _.map(nodes, (node, index) =>
          <span className={`${baseClass}-node`} key={node.id}>
            <span className={`${baseClass}-node-divider`}> > </span>
            <BreadcrumbNodeComponent
              isLast={index === nodes.length - 1}
              node={node}
              onClick={onClick}
            />
          </span>
        )
      }
    </div>
  );
};

BreadcrumbComponent.displayName = 'AlexandriaBreadcrumbComponent';

BreadcrumbComponent.propTypes = {
  nodes: PropTypes.arrayOf(BreadcrumbNodeComponent.propTypes.node).isRequired,
  onClick: PropTypes.func.isRequired,
};
BreadcrumbComponent.defaultProps = {
  nodes: [],
  onClick: (newActiveId) => {
    throw new Error(`Alexandria Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
};

export default BreadcrumbComponent;
