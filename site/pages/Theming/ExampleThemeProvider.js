import React from 'react';
import { ThemeProvider } from 'react-css-themr';
import Button from 'components/Button';

/* SPLIT */

import adminButton from './adminButton.scss';

const themeContext = {
  Button: adminButton
};

/* SPLIT */

export default () => (
  <ThemeProvider theme={themeContext}>
    <div>
      <Button>primary</Button>
      <Button secondary>secondary</Button>
      <Button secondary disabled>
        secondary disabled
      </Button>
    </div>
  </ThemeProvider>
);
