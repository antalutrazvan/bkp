import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Highlight from './Highlight';
import styles from './Example.scss';
import ExampleToggle from './ExampleToggle';
import ExampleActions from './ExampleActions';

export default class Example extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      toggle: '',
      actions: []
    };

    this.onToggleChange = this.onToggleChange.bind(this);
    this.clearActions = this.clearActions.bind(this);
  }

  render() {
    const { toggle } = this.state;

    return (
      <div className={styles.example}>
        <div className={styles.toggle}>
          <ExampleToggle value={toggle} onChange={this.onToggleChange} />
        </div>
        {this.getRenderedComponent()}
        {toggle !== '' && (
          <div className={styles.detail}>
            <div className={styles.detailContent}>
              {toggle === 'code' && this.renderSourceCode()}
              {toggle === 'actions' && this.renderActionLogger()}
            </div>
            <button
              className={styles.detailClose}
              onClick={this.onToggleChange.bind(this, '')}
            >
              <span className="glyphicons glyphicons-remove" />
            </button>
          </div>
        )}
      </div>
    );
  }

  getRenderedComponent() {
    const { stateProps, variationsProps } = this.context;

    return this.props.children({
      action: this.action.bind(this),
      state: stateProps,
      variation: variationsProps
    });
  }

  action(type) {
    return (...params) => {
      const args = Array.from(params).map(p => {
        if (typeof p === 'object' && typeof p.persist === 'function') {
          p.persist();
        }
        return p;
      });
      const newActions = [...this.state.actions, { type, data: args }];
      this.setState({ actions: newActions });
    };
  }

  onToggleChange(toggle) {
    this.setState({ toggle });
  }

  renderSourceCode() {
    return <Highlight>{this.getRenderedComponent()}</Highlight>;
  }

  renderActionLogger() {
    return <ExampleActions values={this.state.actions} onClear={this.clearActions} />;
  }

  clearActions() {
    this.setState({ actions: [] });
  }
}

Example.propTypes = {
  children: PropTypes.func.isRequired
};

Example.contextTypes = {
  stateProps: PropTypes.object,
  variationsProps: PropTypes.object
};
