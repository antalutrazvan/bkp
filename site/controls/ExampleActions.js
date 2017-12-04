import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-inspector';

import styles from './ExampleActions.scss';

class ExampleActions extends Component {
  render() {
    const { values, onClear } = this.props;
    if (!values.length) {
      return <p className={styles.empty}>no actions triggered</p>;
    }

    return (
      <div>
        <button onClick={onClear}>clear</button>
        {this.props.values.map(this.renderAction)}
      </div>
    );
  }

  renderAction(action, i) {
    const name = `action "${action.type}"`;
    return <Inspector key={i} showNonenumerable name={name} data={action.data} />;
  }
}

ExampleActions.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      data: PropTypes.any
    })
  ).isRequired,
  onClear: PropTypes.func
};

ExampleActions.defaultProps = {
  values: []
};

export default ExampleActions;
