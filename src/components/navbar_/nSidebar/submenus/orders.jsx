import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const ACTIVE_CLASS = 'report-page-menu__link-active';
const DEF_CLASS = 'submenu-link';

const linksData = [
    {
        title: 'menu.orders.inwork',
        to: 'https://auto.e-credit.one/',
        activeClass: ACTIVE_CLASS
    },
    {
        title: 'menu.orders.list',
        to: 'https://auto.e-credit.one/',
        activeClass: ACTIVE_CLASS
    },
    {
        title: 'menu.orders.lost',
        to: 'https://auto.e-credit.one/',
        activeClass: ACTIVE_CLASS
    }
];

const links = linksData.map(link => (
    <a href={link.to} className={DEF_CLASS}>
        <FormattedMessage id={link.title} defaultMessage=''/>
    </a>
));

const OrdersLink = props => {
    return (
        <>
            <div className='nav-group top' style={{marginTop: 178}}>{links}</div>
            <div className='nav-group middle'></div>
            <div className='nav-group bottom'></div>
        </>
    );
};

export default OrdersLink;
