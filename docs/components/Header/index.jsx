import React from 'react';
import { Button, PageTitle, SvgSymbol } from '../../../src';
import './styles.scss';

const HeaderGraphics = () => (
  <span>
    <SvgSymbol href="./assets/svg-symbols.svg#logo" />
    {/ui\.adslot\.com/.test(window.location.href) ? <img src="https://badge.fury.io/js/adslot-ui.svg" /> : null}
  </span>
);

export default () => (
  <div className="adslot-ui-header">
    <PageTitle title={<HeaderGraphics />}>
      <small>
        <Button bsStyle="link" href="https://adslot.com">
          Visit Adslot
        </Button>
      </small>
      <small>
        <Button bsStyle="link" href="https://github.com/Adslot/adslot-ui">
          View on GitHub
        </Button>
      </small>
    </PageTitle>
  </div>
);
