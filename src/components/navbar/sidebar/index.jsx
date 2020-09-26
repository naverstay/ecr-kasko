import React, { Component, Fragment } from 'react';
import {
	showAvatar,
	topNavButtons,
	midNavButtons,
	bottomNavButtons,
	accountSubMenu,
} from './global-const';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	navbarToggle,
	navbarSetActive,
	navbarOpen,
	navbarClose,
} from '../../../store/navbar';
import { userLogout } from '../../../store/user';
import cn from 'classnames';
import './style.scss';
import SidebarButton from './sidebar-button';
import SubMenu from './SubMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCloudDownloadAlt,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

const enhance = connect(
	({ navbar }) => ({
		isOpen: navbar.isOpen,
		activeNav: navbar.activeNav,
		isFirstPanelOpen: navbar.isFirstPanelOpen,
	}),
	{
		navbarToggle,
		navbarSetActive,
		navbarOpen,
		navbarClose,
		userLogout,
	}
);

class Sidebar extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		isOpen: PropTypes.bool,
		activeNav: PropTypes.object,
		updateSidebarState: PropTypes.func,
	};

	toggleFirstPanelHandle = (e) => {
		e.stopPropagation()
		this.props.updateSidebarState(!this.props.sidebarHovered);
	};
	
	navClickHandler = nav => () => {
		const {
			activeNav,
			isOpen,
			navbarSetActive,
			navbarClose,
			navbarToggle,
			navbarOpen,
		} = this.props;

		console.log('nav click', nav, isOpen);

		if (nav.name !== activeNav.name) {
			navbarSetActive(nav);
		}
		if (nav.link && isOpen) {
			return navbarClose();
		}
		if (!nav.link && !isOpen) {
			return navbarOpen();
		}
		if (!nav.link && nav.name === activeNav.name) {
			return navbarToggle(isOpen);
		}

		return;
	};

	navMouseEnterHandler = nav => () => {
		const {
			activeNav,
			isOpen,
			navbarSetActive,
			navbarClose,
			navbarToggle,
			navbarOpen,
		} = this.props;

		if (nav.name !== activeNav.name) {
			navbarSetActive(nav);
		}

		if (!nav.link && !isOpen) {
			return navbarOpen();
		}

		return;
	};

	navMouseLeaveHandler = nav => () => {
		const {
			activeNav,
			isOpen,
			navbarSetActive,
			navbarClose,
			navbarToggle,
			navbarOpen,
		} = this.props;

		//if (nav.link && isOpen) {
		//	return navbarClose();
		//}

		//if (!nav.link && nav.name === activeNav.name) {
		//	return navbarToggle(isOpen);
		//}

		return;
	};

	backdropClickHandler = () => {
		if (this.props.isOpen) {
			this.props.navbarClose();
		}
	};

	exitClickHandler = e => {
		this.props.userLogout();
	};

	componentDidUpdate(prevProps) {}

	getCurrentActiveComp() {
		if (this.props.activeNav && !!this.props.activeNav.component) {
			return this.props.activeNav.component;
		}

		return null;
	}

	buttonsFab(source) {
		return source.map(nav => {
			let selected = false;

			if (nav.submenu && nav.submenu.length) {
				nav.submenu.map(function (sm) {
					if (window.location.pathname === sm.to) {
						selected = true;
					}
				});
			}

			return (
				<SidebarButton
					key={nav.name}
					name={nav.name}
					submenu={nav.submenu}
					noHover={nav.noHover}
					classList={nav.classList}
					customIcon={nav.customIcon}
					active={this.props.activeNav ? this.props.activeNav.name : false}
					selected={selected}
					onMouseEnter={this.navMouseEnterHandler(nav)}
					onMouseLeave={this.navMouseLeaveHandler(nav)}
				>
					{nav.children && nav.children}
					{nav.label && nav.label}
				</SidebarButton>
			);
		});
	}

	render() {
		const { isOpen, activeNav, asideIsOpen, isFirstPanelOpen, sidebarHovered } = this.props;
		const topButtonsNodes = this.buttonsFab(topNavButtons);
		const middleButtonsNodes = this.buttonsFab(midNavButtons);
		const bottomButtonsNodes = this.buttonsFab(bottomNavButtons);
		
		const CurrentActiveComp =
			activeNav && activeNav.component ? activeNav.component : Fragment;
		const bodyClassList = cn([
			'sidebar__body',
			{
				open:
					isOpen &&
					this.props.sidebarHovered &&
					this.props.activeNav.submenu,
			},
		]);
		const backdropClassList = cn([
			'sidebar__backdrop',
			{
				active:
					isOpen &&
					this.props.sidebarHovered &&
					this.props.activeNav.submenu,
			},
		]);

		return (
			<div
				className={cn([
					'sidebar',
					{ open: isFirstPanelOpen },
					{ hover: isFirstPanelOpen || this.props.sidebarHovered },
				])}
			>
				<div className='sidebar__header'>
					<div className='sidebar__button-wrapper'>
						{topButtonsNodes}
					</div>
					<div className='sidebar__button-wrapper'>
						{middleButtonsNodes}
					</div>
					<div className='sidebar__button-wrapper'>
						{bottomButtonsNodes}
						<SidebarButton
							name='user'
							classList={['sidebar__button-icon', 'avatar']}
							customIcon={
								showAvatar ? (
									<img
										src='img/avatar.png'
										alt='avatar'
										className='avatar-image'
									/>
								) : (
									<div className='avatar-initials'>ОХ</div>
								)
							}
							submenu={accountSubMenu}
							onMouseEnter={this.navMouseEnterHandler({
								name: 'user',
								link: true,
								listClassName: 'align-bottom',
								submenu: accountSubMenu,
								component: SubMenu,
							})}
							onMouseLeave={this.navMouseLeaveHandler({
								name: 'user',
								link: true,
								listClassName: 'align-bottom',
								submenu: accountSubMenu,
								component: SubMenu,
							})}
							children={
								<div className={'sidebar__button-label'}>
									<div className='sidebar__user'>
										<div className='sidebar__user-name'>
											Одри Хепберн
										</div>
										<div className='sidebar__user-role'>
											Менеджер по продажам
											<br />
											ДЦ Дружба
										</div>
									</div>
								</div>
							}
						/>
						<SidebarButton
							name='exit'
							classList={['sidebar__button-icon', 'exit']}
							active={this.props.activeNav ? this.props.activeNav.name : false}
							onClick={this.exitClickHandler}
							children={
								<div className={'sidebar__button-label'}>
									Выйти
								</div>
							}
						/>
					</div>
					<div
						className='sidebar__header-line'
						onClick={this.toggleFirstPanelHandle}
					/>
				</div>
				<div className={bodyClassList}>
					<CurrentActiveComp props={this.props.activeNav} />
				</div>
				<div className={backdropClassList}
					onClick={this.backdropClickHandler}
				/>
			</div>
		);
	}
}

export default Sidebar;
