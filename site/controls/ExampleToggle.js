import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ExampleToggle.scss';

export default class ExampleToggle extends Component {
  render() {
    const { value, onChange } = this.props;
    const classActions = value === 'actions' ? styles.selected : '';
    const classCode = value === 'code' ? styles.selected : '';

    return (
      <div className={styles.toggle}>
        <button className={classActions} onClick={onChange.bind(this, 'actions')}>
          <span className="glyphicons glyphicons-list" />
        </button>
        <button className={classCode} onClick={onChange.bind(this, 'code')}>
          <span className="glyphicons glyphicons-embed" />
        </button>
      </div>
    );
  }
}

ExampleToggle.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};
