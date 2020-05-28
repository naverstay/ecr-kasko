import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ACTIVE_CLASS = 'report-page-menu__link-active';
const DEF_CLASS = 'submenu-link';

const linksData = [
	{
		title: 'menu.settings.acc',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.settings.commision',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.settings.target',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.settings.tramp',
		to: 'https://auto.e-credit.one/',
		activeClass: ACTIVE_CLASS,
	},
];

const links = linksData.map(link => (
	<a href={link.to} className={DEF_CLASS}>
		<FormattedMessage id={link.title} defaultMessage='' />
	</a>
));

const SettingsLink = props => {
	return (
		<>
			<div className='nav-group top'></div>
			<div className='nav-group middle'></div>
			<div className='nav-group bottom'>{links}</div>
		</>
	);
};

export default SettingsLink;
