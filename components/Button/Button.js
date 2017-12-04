import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PlainButton extends Component {
  render() {
    const { theme, secondary, variant, disabled, missing, onClick, children } = this.props;
    const primary = !secondary;
    const classes = classNames(theme.button, {
      [theme.primary]: primary,
      [theme.secondary]: secondary,
      [theme[variant]]: secondary,
      [theme.disabled]: disabled,
      [theme.missing]: missing
    });

    return (
      <button disabled={disabled} className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
}

PlainButton.propTypes = {
  theme: PropTypes.object.isRequired,
  secondary: PropTypes.bool,
  variant: PropTypes.oneOf(['outline', 'white']),
  disabled: PropTypes.bool,
  missing: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  // prop validation for an imported component
  // this way we can keep the validation intact and in sync with that component
  // the output from docgen is 'PlainButton.propTypes' as a string
  // this info could be used to link to the documentation for that components
  ComponentB: PropTypes.shape(PlainButton.propTypes),
  // an example of a deep vaidated object
  options: PropTypes.shape({
    optionOne: PropTypes.string,
    optionTwo: PropTypes.string,
  })
};

PlainButton.defaultProps = {
  theme: {},
  variant: 'outline',
  options: {
    optionOne: 'someValue',
    optionTwo: 'someValue',
  },
  // this doesn't do anything from a documentation perspective 
  // as the default prop value parsed by docgen 
  // will be 'PlainButton.defaultProps' as a string
  // but it will have the default value as specified by the imported component
  // which is what matters I think
  ComponentB: PlainButton.defaultProps
};

export default PlainButton;
