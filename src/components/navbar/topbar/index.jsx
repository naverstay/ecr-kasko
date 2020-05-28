import React, { useState } from 'react';
import {showAvatar, topNavButtons, midNavButtons, bottomNavButtons, accountSubMenu} from '../sidebar/global-const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
	faBars,
	faFilter,
	faChevronDown,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import SidebarButton from '../sidebar/sidebar-button';
//import Filters from '../../filters';
import './style.scss';
import SubMenu from "../sidebar/SubMenu";
import {connect} from "react-redux";
import {navbarClose, navbarOpen, navbarSetActive, navbarToggle} from "../../../store/navbar";
import {userLogout} from "../../../store/user";

function Topbar(props) {
	const [active, setActive] = useState('');

	const classListBtn = classNames => ['topbar__button-icon', ...classNames];
	const classListBody = (classNames, name) =>
		cn(['topbar__body-container', ...classNames, { active: name === active }]);

	const navClickHandler = name => () => {
		const activeName = name === active ? '' : name;
		return setActive(activeName);
	};
	const chevronIcon = () =>
		active === 'reports' ? faChevronUp : faChevronDown;

	let buttonsFab = (source, notitle) => {
		return source.map(nav => {
			let selected = false

			if (nav.submenu && nav.submenu.length) {
				nav.submenu.map((sm) => {
					if (window.location.pathname === sm.to) {
						selected = true
					}
				})
			}

			return (
				!nav.mobHidden && <SidebarButton
					key={nav.name}
					name={nav.name}
					submenu={nav.submenu}
					mobsubmenu={true}
					noHover={nav.noHover}
					classList={nav.classList}
					customIcon={nav.customIcon}
					//active={props.activeNav.name}
					selected={selected}
				>
					{!notitle && nav.children && nav.children}
					{!notitle && nav.label && nav.label}
				</SidebarButton>
			);
		});
	}

	const menuButtonsNodes = buttonsFab(topNavButtons.concat(midNavButtons, bottomNavButtons));

	const reportButtonsNodes = buttonsFab(bottomNavButtons.filter(m => {
		return m.name === 'charts'
	}), true);
	
	return (
		<div className='topbar'>
			<div className='topbar__header'>
				<div className='topbar__menu-button'>
					<SidebarButton
						name='home'
						classList={classListBtn(['home'])}
						active={active}
						onClick={navClickHandler('home')}
						customIcon={<img src='e.svg' alt='ecredit' className='inner-image'/>}
					>
					</SidebarButton>
				</div>
				<SidebarButton
					name='menu'
					classList={classListBtn([''])}
					active={active}
					onClick={navClickHandler('menu')}
					customIcon={<FontAwesomeIcon icon={faBars}/>}
				>
				</SidebarButton>
				<SidebarButton
					name='reports'
					active={active}
					wide={true}
					classList={['topbar__reports-button']}
					onClick={navClickHandler('reports')}
					customIcon={
						<>
						<span>
							<FormattedMessage id='topbar.report' defaultMessage='Отчеты'/>
						</span>
							<FontAwesomeIcon icon={chevronIcon()}/>
						</>
					}
				>
				</SidebarButton>
				<div className='topbar__filters-button'>
					<SidebarButton
						name='filters'
						classList={classListBtn([''])}
						active={active}
						onClick={navClickHandler('filters')}
						customIcon={
							<FontAwesomeIcon icon={faFilter}/>
						}
					>
					</SidebarButton>
				</div>
			</div>
			<div className='topbar__body'>
				<div className={classListBody(['menu'], 'menu')}>
					{menuButtonsNodes}
					<SidebarButton
						name='user'
						classList={['sidebar__button-icon', 'avatar']}
						customIcon={
							showAvatar ?
								<img
									src='img/avatar.png'
									alt='avatar'
									className='avatar-image'
								/> :
								<div className="avatar-initials">
									ОХ
								</div>
						}
						mobsubmenu={true}
						submenu={accountSubMenu}
						children={
							<div className={'sidebar__button-label'}>
								<div className='sidebar__user'>
									<div className='sidebar__user-name'>Одри Хепберн</div>
									<div className='sidebar__user-role'>
										Менеджер по продажам
										<br/>
										ДЦ Дружба
									</div>
								</div>
							</div>
						}
					/>
					<SidebarButton
						name='exit'
						classList={['sidebar__button-icon', 'exit']}
						//active={this.props.activeNav.name}
						//onClick={exitClickHandler}
						children={<div className={'sidebar__button-label'}>Выйти</div>}
					/>
				</div>
				<div className={classListBody(['reports'], 'reports')}>
					{reportButtonsNodes}
				</div>
				<div className={classListBody(['filters'], 'filters')}>
					<div className='topbar__body-container__inner'>
						{/*<Filters />*/}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Topbar;
