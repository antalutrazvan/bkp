import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './VariationsExclusive.scss';

let variationsCounter = 0;

export default class VariationsExclusive extends Component {
  constructor(...args) {
    super(...args);
    variationsCounter++;
  }

  render() {
    return (
      <div className={styles.variation}>
        {this.props.options.map(this.renderOption, this)}
      </div>
    );
  }

  componentDidMount() {
    const option = this.props.options.find(o => o.default);
    this.triggerChange(option);
  }

  renderOption({ name, id }) {
    const checked = this.props.value.indexOf(name) >= 0;

    return (
      <div key={id}>
        <input
          id={id}
          type="radio"
          name={`variation-${variationsCounter}`}
          value={name}
          checked={checked}
          onChange={e => this.onOptionChange(e.target.value)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  }

  onOptionChange(name) {
    const option = this.props.options.find(o => o.name === name);
    this.triggerChange(option);
  }

  triggerChange(option) {
    const { options, onChange } = this.props;
    const selectedOption = option || options[0];
    onChange([selectedOption.name], selectedOption.props);
  }
}

VariationsExclusive.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      default: PropTypes.bool,
      id: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func
};
