import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './States.scss';

export default class States extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      options: []
    };

    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    const options = getStateOptions(this.props.children);
    this.setState({ options }, () => {
      this.onOptionChange(...options[0]);
    });
  }

  render() {
    const { stateName } = this.context;

    return (
      <div className={styles.states}>
        <select value={stateName} onChange={e => this.onOptionChange(e.target.value)}>
          {this.state.options.map(this.renderOption, this)}
        </select>
      </div>
    );
  }

  renderOption({ name }) {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    );
  }

  onOptionChange(name) {
    const { options } = this.state;
    const option = options.find(option => option.name === name);
    this.context.onStateChange(name, (option || options[0]).props);
  }
}

States.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

States.contextTypes = {
  onStateChange: PropTypes.func,
  stateName: PropTypes.string
};

function getStateOptions(children) {
  let options = [];

  React.Children.forEach(children, child => {
    const { name, props } = child.props;
    options.push({ name, props });
  });

  return options;
}
