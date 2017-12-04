import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse as parsePropTypes } from 'react-docgen';

import PropsTable from './PropsTable';

export default class PropsListing extends Component {
  constructor(...props) {
    super(...props);

    const docs = parsePropTypes(this.props.for);
    console.log(docs);
    const propsList = [];
    for (let prop in docs.props) {
      if (docs.props.hasOwnProperty(prop)) {
        propsList.push({ ...docs.props[prop], key: prop });
      }
    }
    this.types = propsList;
  }

  render() {
    return (
      <div>
        <h2>PropTypes</h2>
        <PropsTable types={this.types} />
      </div>
    );
  }
}

PropsListing.propTypes = {
  for: PropTypes.string.isRequired
};
