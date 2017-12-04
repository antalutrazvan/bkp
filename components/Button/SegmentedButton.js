import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PlainSegmentedButton extends Component {
  state = {
    menuOpened: false
  };

  handleClickSecondary = () => {
    const { withMenu, onClickSecondary } = this.props;

    if (withMenu) {
      this.toggleMenu();
    }

    if (onClickSecondary && typeof onClickSecondary === 'function') {
      onClickSecondary();
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpened: !this.state.menuOpened
    });
  }

  render() {
    const { theme, disabled, onClick, onClickSecondary, children, withMenu } = this.props;
    const leftSegmentClasses = classNames(theme.button, theme.left, {
      [theme.disabled]: disabled
    });
    const rightSegmentClasses = classNames(theme.button, theme.right, {
      [theme.withMenu]: withMenu,
      [theme.disabled]: disabled
    });

    return (
        <div className={theme.wrapper}>
            <button disabled={disabled} className={leftSegmentClasses} onClick={onClick}>
                {children}
            </button>
            <button disabled={disabled} className={rightSegmentClasses} onClick={this.handleClickSecondary}>
                <span className="glyphicons glyphicons-clock" />
                {withMenu ? withMenu({isOpen: this.state.menuOpened}) : null}
            </button>
        </div>
    );
  }
}

PlainSegmentedButton.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  withMenu: PropTypes.bool,
  onClick: PropTypes.func,
  onClickSecondary: PropTypes.func
};

PlainSegmentedButton.defaultProps = {
  theme: {},
};

export default PlainSegmentedButton;
