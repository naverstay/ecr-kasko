import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.scss';
import {MenuLink} from "./MenuLink";

class SidebarButton extends Component {
    constructor(props) {
        super(props)
        this.toggleSubmenuHandle = this.toggleSubmenuHandle.bind(this)
        this.state = {submenuOpen: false}
    }

    static propTypes = {
        active: PropTypes.string,
        hovered: PropTypes.bool,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        mobsubmenu: PropTypes.bool,
        submenu: PropTypes.array,
        wide: PropTypes.bool,
        noHover: PropTypes.bool,
        classList: PropTypes.array,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        children: PropTypes.node,
        customIcon: PropTypes.node,
        onClick: PropTypes.func,
        name: PropTypes.string
    }

    toggleSubmenuHandle() {
        this.setState({submenuOpen: !this.state.submenuOpen});
    }

    render() {
        const {
            active,
            hovered,
            selected,
            disabled,
            submenu,
            mobsubmenu,
            wide,
            noHover,
            classList,
            onMouseEnter,
            onMouseLeave,
            onClick,
            children,
            customIcon,
            name
        } = this.props;
        const className = cn([
            ...(classList ? classList : [])
        ]);
        const hasSubmenu = mobsubmenu && submenu && submenu.length
        const submenuClassName = cn([
            'sidebar__button-submenu',
            {open: this.state.submenuOpen}
        ]);
        const btnClassName = cn([
            'sidebar__button',
            {active: name === active, hovered, disabled},
            {selected: selected},
            {open: this.state.submenuOpen},
            {'button-submenu': submenu && submenu.length},
            {'button-wide': wide},
            {'label-nohover': noHover}
        ]);

        let childrengarden = children

        if (hasSubmenu) {
            childrengarden = React.Children.map(this.props.children, child => {
                    return child ? React.cloneElement(child, {
                        onClick: this.toggleSubmenuHandle
                    }) : child
                }
            );
        }

        return (
            <div className={btnClassName} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
                <div className={className}>{customIcon && customIcon}</div>
                {childrengarden}
                {
                    hasSubmenu && <ul className={submenuClassName}>
                        {
                            submenu.map((link, i) => {
                                return (
                                    link.classList.indexOf('submenu-item__empty') === -1 && <MenuLink
                                        key={`${link.title}-${link.to}-${i}`}
                                        navClassList={['submenu-link']}
                                        classList={link.classList}
                                        {...link}
                                    />
                                )
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
};

export default SidebarButton;
