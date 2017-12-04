import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Menu.scss';

class Menu extends Component {
  render() {
    const { general, components, layouts } = this.props.items;

    return (
      <nav className={styles.menu}>
        <ul className={styles.main}>
          {general.map(this.renderMenuItem.bind(this, 'main'))}
          <li>
            <em className={styles.category}>Components</em>
            <ul className={styles.sub}>
              {components.map(this.renderMenuItem.bind(this, 'sub'))}
            </ul>
          </li>
          <li>
            <em className={styles.category}>Layouts</em>
            <ul className={styles.sub}>
              {layouts.map(this.renderMenuItem.bind(this, 'sub'))}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }

  renderMenuItem(level, page) {
    const name = page.id;
    const { selected, onSelect } = this.props;
    const className = selected === name ? styles[`${level}-active`] : '';

    return (
      <li className={styles[`${level}-item`]} key={name}>
        <a
          className={className}
          href={`/${name}`}
          onClick={e => {
            e.preventDefault();
            onSelect({ name, title: page.title });
          }}
        >
          {page.title}
        </a>
      </li>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.shape({
    general: PropTypes.array,
    components: PropTypes.array,
    layouts: PropTypes.array
  }).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default Menu;
