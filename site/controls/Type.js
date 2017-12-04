import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Type.scss';
import tokenize from '../tokenize';

export default class Type extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      componentStateName: '',
      componentStateProps: {},
      componentVariationsNames: [],
      componentVariationsProps: {}
    };
  }

  render() {
    const { name, subtype, children } = this.props;
    const className = subtype ? styles.subtype : styles.type;

    return (
      <div className={className}>
        <a id={tokenize(name)} />
        {this.renderCaption()}
        {children}
      </div>
    );
  }

  renderCaption() {
    const { name, subtype } = this.props;

    if (subtype) {
      return <h3>{name}</h3>;
    }

    return <h2>{name}</h2>;
  }

  getChildContext() {
    const {
      componentStateName,
      componentStateProps,
      componentVariationsNames,
      componentVariationsProps
    } = this.state;

    return {
      onStateChange: (name, props) =>
        this.setState({
          componentStateName: name,
          componentStateProps: props
        }),
      stateName: componentStateName,
      stateProps: componentStateProps,

      onVariationChange: (names, props) => {
        this.setState({
          componentVariationsNames: names,
          componentVariationsProps: props
        });
      },
      variationsNames: componentVariationsNames,
      variationsProps: componentVariationsProps
    };
  }
}

Type.propTypes = {
  name: PropTypes.string.isRequired,
  subtype: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
    .isRequired
};

Type.childContextTypes = {
  onStateChange: PropTypes.func,
  stateName: PropTypes.string,
  stateProps: PropTypes.object,
  onVariationChange: PropTypes.func,
  variationsNames: PropTypes.arrayOf(PropTypes.string),
  variationsProps: PropTypes.object
};

export function getTypesNodes(children) {
  let nodes = [];
  React.Children.forEach(children, child => {
    if (child.type === Type) {
      nodes.push(child);
    }
  });
  return nodes;
}
