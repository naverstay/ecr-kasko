import React from 'react';
import cn from 'classnames';
import {NavLink} from 'react-router-dom';
import './style.scss';

const ReportPageMenu = ({pages = [], userWeight}) => {
    const links = pages.filter(page => page.weight <= userWeight).map(({title, to}, i) => {
        if (i < pages.length - 1) {
            return (
                <span key={title}>
                    <NavLink
                        to={to}
                        title={title}
                        className="report-page-menu__link"
                        activeClassName="report-page-menu__link-active"
                    >
                        {title}
                    </NavLink>
                    <span>/</span>
                </span>
            )
        }
        return (
            <span key={title}>
                <NavLink to={to}
                         title={title}
                         className="report-page-menu__link"
                         activeClassName="report-page-menu__link-active"
                >
                    {title}
                </NavLink>
            </ span>
        )
    });

    return (
        <div className="report-page-menu__wrapper">
            <div className="report-page-menu__container">
                {links}
            </div>
        </div>
    );
}

export default ReportPageMenu;
