import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PlainContextMenuItem extends Component {
    state = {
        isOpen: false
    };
    
    toggle = (open) => {
        this.setState({
            isOpen: typeof open === 'boolean' ? open : !this.state.isOpen
        });
    }
    
    handleClick = (event, ...args) => {
        const { onClick, bubbles, submenu } = this.props;
        const { onClick: menuHandler } = this.context;
        if (onClick && typeof onClick === 'function') { onClick(event, this) }        
        if (bubbles && menuHandler && typeof menuHandler === 'function') { menuHandler(event, this) }
    }

    render() {
        const {theme, disabled, submenu, children } = this.props;
        const { isOpen } = this.state;

        const classes = classnames(theme.item, {
            [theme.submenu]: submenu,
            [theme.disabled]: disabled
        });

        if (submenu) {
            return <li className={classes} onMouseEnter={this.toggle} onMouseLeave={this.toggle}>
                {children({
                    isOpen: this.state.isOpen
                })}
            </li>;        
        }

        return <li className={classes} onClick={this.handleClick}>
            { children }
        </li>;
    }
}

PlainContextMenuItem.propTypes = {
    theme: PropTypes.object.isRequired,
    bubbles: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    submenu: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

PlainContextMenuItem.defaultProps = {
    theme: {},
    bubbles: true
};

PlainContextMenuItem.contextTypes = {
    onClick: PropTypes.func
}

export default PlainContextMenuItem;