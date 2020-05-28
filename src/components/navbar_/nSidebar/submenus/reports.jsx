import React, { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ACTIVE_CLASS = 'report-page-menu__link-active';
const DEF_CLASS = 'submenu-link';

const linksData = [
	{
		title: 'menu.reports.sales-performance',
		to: '/sales-performance',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.reports.profit',
		to: '/profit',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.reports.employee-performance',
		to: '/employee-performance',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.reports.bank-efficiency',
		to: '/bank-efficiency',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.reports.sales-reconciliation',
		to: '/sales-reconciliation',
		activeClass: ACTIVE_CLASS,
	},
	{
		title: 'menu.reports.marketing',
		to: '/marketing',
		activeClass: ACTIVE_CLASS,
    },
    {
		title: 'menu.reports.plan-and-fact',
		to: '/plan-and-fact',
		activeClass: ACTIVE_CLASS,
	},
	
];

let linksELements = linksData.map(link => <NavLink
    key={link.to}
    to={link.to}
    className={DEF_CLASS}
    >
        <FormattedMessage id={link.title} defaultMessage='' />
    </NavLink>);

const ReporsLink = ({userWeight}) => { 
	const [links, setLinks] = useState([]);

	useEffect(() => {
		let $links = linksELements;
		if (userWeight === 1) { 
			$links = [
				<NavLink
					key={linksData[4].to}
					to={linksData[4].to}
					className={DEF_CLASS}
				>
					<FormattedMessage id={linksData[4].title} defaultMessage='' />
				</NavLink>
			];
		}
	
		if (userWeight === 100) { 
			$links = [...$links, (
				<NavLink
					key={'/admin'}
					to={'/admin'}
					className={DEF_CLASS}
				>
					<FormattedMessage
						id={'menu.reports.admin'}
						defaultMessage='' />
				</NavLink>
			)];
		}
		setLinks($links);
	 },[userWeight]);

    return (
		<>
			<div className='nav-group top'></div>
			<div className='nav-group middle' style={{marginTop:182}}>{links}</div>
			<div className='nav-group bottom'></div>
		</>
	);
}

export default ReporsLink;