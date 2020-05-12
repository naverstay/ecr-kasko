import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ACTIVE_CLASS = 'report-page-menu__link-active';
const DEF_CLASS = 'submenu-link';

const linksData = [
	{
		title: 'menu.banks.banks',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.banks.market',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},	
];

const links = linksData.map(link => (
	<a href={link.to} className={DEF_CLASS}>
		<FormattedMessage id={link.title} defaultMessage='' />
	</a>
));

const OrdersLink = props => {
	return (
		<>
			<div className='nav-group top' style={{marginTop:230}}>{links}</div>
			<div className='nav-group middle' ></div>
			<div className='nav-group bottom'></div>
		</>
	);
};

export default OrdersLink;
