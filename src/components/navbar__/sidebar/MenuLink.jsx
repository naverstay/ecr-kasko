import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const MenuLink = ({ to, title='', classList='', navClassList='', navActiveClass='active'}) => { 

    let children = <>{title}</>

    if (!!to) { 
        children = <NavLink
            to={to}
            title={title}
            className={cn([...navClassList])}
            activeClassName={navActiveClass}
        >{title}</NavLink>
    }

    return (
        <li className={cn([...classList])}>
            {children}
		</li>
    );
}