import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PlainContextMenu extends Component {
    getChildContext() {
        return {
            onClick: this.props.onClick
        };
    }

    render() {
        const { theme, isOpen, absolute, positioning, children } = this.props;
        
        const classes = classNames(theme.menu, {
            [theme.absolute] : absolute,
            [theme[positioning]] : absolute
        });

        return ( !isOpen ? null :
                <ul className={classes}>
                    {children}
                </ul>
        );
    }
}

PlainContextMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  absolute: PropTypes.bool,
  positioning: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  children: PropTypes.node,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool
};

PlainContextMenu.defaultProps = {
  theme: {},
  positioning: 'top-right',
  isOpen: false
};

PlainContextMenu.childContextTypes = {
    onClick: PropTypes.func
};

export default PlainContextMenu;
