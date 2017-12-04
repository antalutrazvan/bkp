import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './VariationsMulti.scss';

export default class VariationsMulti extends Component {
  render() {
    return (
      <div className={styles.variation}>
        {this.props.options.map(this.renderOption, this)}
      </div>
    );
  }

  componentDidMount() {
    const newNames = this.props.options.filter(o => o.default).map(o => o.name);
    this.triggerChange(newNames);
  }

  renderOption({ name, id }) {
    const checked = this.props.value.indexOf(name) >= 0;

    return (
      <div key={id}>
        <input
          id={id}
          type="checkbox"
          value={name}
          checked={checked}
          onChange={e => this.onOptionChange(e.target.value)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  }

  onOptionChange(name) {
    const newNames = toggleName(this.props.value, name);
    this.triggerChange(newNames);
  }

  triggerChange(names) {
    const { options, onChange } = this.props;
    const newProps = composeProps(names, options);
    onChange(names, newProps);
  }
}

VariationsMulti.propTypes = {
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

function toggleName(names, newName) {
  let newNames = [];
  let found = false;
  names.forEach(name => {
    if (name !== newName) {
      newNames.push(name);
    } else {
      found = true;
    }
  });
  if (!found) {
    newNames.push(newName);
  }
  return newNames;
}

function composeProps(names, options) {
  let props = {};
  names.forEach(name => {
    const optionProps = options.find(o => o.name === name).props;
    props = Object.assign(props, optionProps);
  });
  return props;
}
