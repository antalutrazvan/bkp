import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from './Highlight';
import styles from './PropsTable.scss';

const flattenRows = (rows) => {
  return rows.reduce((finalRows, item) => {
    return finalRows.concat(Array.isArray(item) ? flattenRows(item) : item);
  }, []);
};

const toArray = (shape) => {
  const keys = Object.keys(shape);
  return keys.map((key) => ({key, value: shape[key]}));
}

class PropsTable extends Component {
  render() {
    return (
      <table className={styles['props-table']}>
        <thead className={styles['props-table-header']}>
          <tr className={styles.head}>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{flattenRows(this.props.types.map(this.renderRow.bind(this)))}</tbody>
      </table>
    );
  }

  renderRow(type) {
    const required = type.required ? 'Yes' : 'No';
    let defaultValue = (type.defaultValue && type.defaultValue.value) || '-';

    const isComposed = typeof type.type.value === 'string';
    const isShape = typeof type.type.value === 'object';

    if (isComposed) {
      console.log('isComposed', type);
      const subComponentName = type.type.value.replace('.propTypes', '').replace('Plain', '');
      defaultValue = <a href={`./${subComponentName}`}>{subComponentName}</a>
    }

    if (isShape) {
      console.log('isShape', type);
      let subProps = toArray(type.type.value);

      if (type.type.name === 'enum') {
        subProps = subProps.map((prop) => {
          const key = `${type.key}.${prop.key}`;
          console.log(prop);
          return (
            <tr key={key} className={styles.row}>
              <td><span className={styles['union-key']}>{prop.key}</span></td>
              <td><Highlight language="javascript">{prop.value.value}</Highlight></td>
              <td></td>
            </tr>
          )
        });        
      } else {
        subProps = subProps.map((prop) => {
          const key = `${type.key}.${prop.key}`;
          return (
            <tr key={key} className={styles.row}>
              <td><span className={styles['union-name']}>{type.key}.</span><span className={styles['union-key']}>{prop.key}</span></td>
              <td>{prop.value.name}</td>
              <td>{prop.value.required ? 'Yes': 'No'}</td>
              <td></td>
              <td></td>
            </tr>
          )
        });
      }

      return [<tr key={type.key}  className={styles.subrow}>
        <td>{type.key}</td>
        <td>{type.type.name}</td>
        <td>{required}</td>
        <td><Highlight language="javascript">{defaultValue}</Highlight></td>
        <td>{type.description}</td>
      </tr>, ...subProps];
    }

    return (
      <tr key={type.key} className={styles.row}>
        <td>{type.key}</td>
        <td>{type.type.name}</td>
        <td>{required}</td>
        <td>{ isComposed ? defaultValue : <Highlight language="javascript">{defaultValue}</Highlight> }</td>
        <td>{type.description}</td>
      </tr>
    );
  }
}

PropsTable.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.object,
      defaultValue: PropTypes.object
    })
  )
};

export default PropsTable;
