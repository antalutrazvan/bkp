import React from 'react';
import PropTypes from 'prop-types';

import styles from './HSplit.scss';

const HSplit = ({ children }) => <div className={styles.split}>{children}</div>;

HSplit.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default HSplit;
