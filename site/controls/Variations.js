import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Variations.scss';
import VariationsMulti from './VariationsMulti';
import VariationsExclusive from './VariationsExclusive';

let checkboxCounter = 1;

export default class Variations extends Component {
  constructor(...args) {
    super(...args);

    const options = getVariationsOptions(this.props.children);

    this.state = {
      options
    };

    this.onChange = this.onChange.bind(this);
  }

  render() {
    const ComponentClass = this.props.exclusive ? VariationsExclusive : VariationsMulti;
    return (
      <div className={styles.variations}>
        <ComponentClass
          value={this.context.variationsNames}
          options={this.state.options}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange(names, props) {
    this.context.onVariationChange(names, props);
  }
}

Variations.propTypes = {
  exclusive: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Variations.contextTypes = {
  onVariationChange: PropTypes.func,
  variationsNames: PropTypes.array,
  variationsProps: PropTypes.object
};

function getVariationsOptions(children) {
  let options = [];

  React.Children.forEach(children, child => {
    const { name, props, default: isDefault } = child.props;
    options.push({
      name,
      props,
      default: isDefault,
      id: `variation-${checkboxCounter++}`
    });
  });

  return options;
}
