import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Page.scss';
import { getTypesNodes } from './Type';
import tokenize from '../tokenize';

export default class Page extends Component {
  render() {
    const { name, children } = this.props;
    const typesNodes = getTypesNodes(children);
    this.count = typesNodes.length;

    return (
      <article>
        <header className={styles.heading}>
          <h1>{name}</h1>
          <em className={styles.navigation}>{typesNodes.map(this.renderLink, this)}</em>
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    );
  }

  renderLink(typeNode, index) {
    const name = typeNode.props.name;
    const link = (
      <a key={name} href={`#${tokenize(name)}`}>
        {name}
      </a>
    );
    const separator = index + 1 < this.count ? <span key={name + 'sep'} /> : null;

    return [link, separator];
  }
}

Page.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
};
