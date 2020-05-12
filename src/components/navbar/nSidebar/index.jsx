import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { faUniversity, faNewspaper, faChevronRight, faPlusCircle, faSearch, faClipboardList, faCog, faChartBar, faUserAstronaut, faSignOutAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import NavButton from './nav-button';
import NavItem from './nav-item';
import LangSwitcher from '../../lang-switcher';
import ToggleButton from './toggle-button';
import SearchNavItem from './search-nav-item';
import { userLogout } from '../../../store/user'
import UserItem from './user-item';

import { withRouter } from 'react-router-dom';
import ReportsLinks from './submenus/reports';
import CalculatesLinks from './submenus/calculate';
import OrdersLinks from './submenus/orders';
import BanksLinks from './submenus/banks';
import SettingsLinks from './submenus/settings';
import UserLinks from './submenus/user';

import './style.scss'

const pathMap = {
	'/sales-performance': 'reports',
	'/profit': 'reports',
	'/employee-performance': 'reports',
	'/bank-efficiency': 'reports',
	'/sales-reconciliation': 'reports',
	'/marketing': 'reports',
	'/plan-and-fact': 'reports',

};

const enhance = connect(
	({ navbar, user }) => ({
		isNavFixed: navbar.isNavFixed,
		userFio: `${user.first_name} ${user.last_name}`,
		userRoles: Object.values(user.roles)
	}),
	{ userLogout }
);

const Sidebar = (props) => {
	const [isDetailPanelActive, setActiveDetailPanel] = useState(false);
	const [isFloatPanelActive, setActiveFloatPanel] = useState(false);
	const [isBackdropActive, setActiveBackdrop] = useState(false);
	const [selected, setSelectedElement] = useState({ id: null, fid: null });
	const [submenu, setSubmenu] = useState(null);
	const [currFid, setCurrFid] = useState(null);


	useEffect(() => {
		const fid = pathMap[props.location.pathname];
		setCurrFid(fid);
	}, [props.location.pathname]);

	useEffect(() => {
		if (props.isNavFixed && !isFloatPanelActive) {
			setActiveBackdrop(false);
		}
		if (!props.isNavFixed && (isFloatPanelActive || isDetailPanelActive)) {
			setActiveBackdrop(true);
		}
	}, [isDetailPanelActive, isFloatPanelActive, props.isNavFixed]);

	const onClick = ({ id, fid, name }) => {
		setActiveFloatPanel(false);
		if (!props.isNavFixed) {
			setActiveDetailPanel(!isDetailPanelActive);
			setActiveBackdrop(!isBackdropActive);
		}
	}

	const allClose = () => {
		setActiveFloatPanel(false);
		if (!props.isNavFixed) {
			setActiveBackdrop(false);
			setActiveDetailPanel(false);
		}
	}

	const setSelected = ({ id, name, fid }) => {
		setSelectedElement({ fid, id });
	}

	const openFloat = ({ id, name, fid }) => {
		if (fid === 'reports') {
			setSubmenu(<ReportsLinks {...props} />);
		}

		if (fid === 'banks') {
			setSubmenu(<BanksLinks />);
		}

		if (fid === 'calculate') {
			setSubmenu(<CalculatesLinks />);
		}

		if (fid === 'orders') {
			setSubmenu(<OrdersLinks />);
		}

		if (fid === 'settings') {
			setSubmenu(<SettingsLinks />);
		}

		if (fid === 'user') {
			setSubmenu(<UserLinks />);
		}

		if (fid === '2') {
			setSubmenu(null);
		}

		if (props.isNavFixed) {
			setActiveBackdrop(true);
		}

		if (isDetailPanelActive) {
			setActiveFloatPanel(true);
		}
	};

	const closeFloat = ({ id, name, fid }) => {
		if (props.isNavFixed) {
			setActiveBackdrop(false);
		}
		setActiveFloatPanel(false);
	};

	const detailCloseFloat = (e) => {
		e.preventDefault();
		closeFloat({});
	}

	const clickExitHandler = () => {
		props.userLogout();
	}
	const newsClickHandler = () => {
		window.open('/', '_blank');
	}

	const ncreateNewClickHandler = () => {
		window.open('https://auto.e-credit.one/#create_new', '_blank');
	}

	const marketClickHandler = () => { 
		window.open('https://auto.e-credit.one/#market', '_blank');
	}

	return (
		<div className={'sidebar-nav'}>
			<div className='sidebar-nav__container'>
				<div
					onClick={allClose}
					className={cn(['sidebar-nav__backdrop',
						{ active: isBackdropActive }])}
				>
				</div>
				<div className={cn(['sidebar-nav__float',
					{ active: isFloatPanelActive }])}
				>
					{submenu}
				</div>
				<div
					onClick={detailCloseFloat}
					className={cn(['sidebar-nav__detail',
						{ active: isDetailPanelActive }])}
				>
					<div className='nav-group top'>
						<NavItem
							onClick={setSelected}
							onMouseOver={closeFloat}
							childType={null}
							fid="home"
							classList={['home']}>
							<LangSwitcher />
							<ToggleButton />
						</NavItem>
						<NavItem
							fid="search"
							onMouseOver={closeFloat}
							childType={null}
							classList={['search']}>
							<SearchNavItem />
						</NavItem>
						<NavItem
							onClick={ncreateNewClickHandler}
							onMouseOver={closeFloat}
							childType=""
							label='Создать заявку'
							fid='new'
						/>
						<NavItem
							onMouseOver={openFloat}
							label='Заявки'
							src={faChevronRight}
							fid='orders'
							active={currFid === 'orders'}
						/>
						<NavItem
							onMouseOver={openFloat}
							label='Банки'
							src={faChevronRight}
							fid='banks'
							active={currFid === 'banks'}
						/>
					</div>
					<div className='nav-group middle'>
						<NavItem
							onClick={newsClickHandler}
							onMouseOver={closeFloat}
							childType=""
							label='Новости'
							fid='news'
						/>


					</div>
					<div className='nav-group bottom'>

						{props.userWeight > 0 && <NavItem
							onMouseOver={openFloat}
							label='Отчеты'
							src={faChevronRight}
							active={currFid === 'reports'}
							fid='reports' />}
						<NavItem
							onClick={marketClickHandler}
							onMouseOver={closeFloat}
							childType=""
							label='Маркет'
							fid='market' />
						<NavItem
							onMouseOver={openFloat}
							label='Настройки'
							src={faChevronRight}
							active={currFid === 'settings'}
							fid='settings' />
						<UserItem
							classList={['user']}
							onMouseOver={openFloat}
							src={faChevronRight}
							userName={props.userFio}
							roles={props.userRoles}
							fid="user"
							active={currFid === 'user'}
						/>

						<NavItem
							onClick={clickExitHandler}
							onMouseOver={closeFloat}
							label='Выйти'
							childType=''
						/>
					</div>
				</div>
				<div className='sidebar-nav__redline'>
					<div className='nav-group top'>
						<NavButton
							classList={['logo']}
							childType='img'
							src='e.svg'
							onClick={onClick}
						/>
						<NavButton
							onClick={onClick}
							childType='icon'
							src={faSearch}
							classList={['search']}
						/>
						<NavButton onClick={onClick} childType='icon' src={faPlusCircle} fid='calculate' active={currFid === 'calculate'} />
						<NavButton
							onClick={onClick}
							childType='icon'
							src={faClipboardList}
							fid='orders'
							active={currFid === 'orders'}
						/>
						<NavButton
							childType='icon'
							src={faUniversity}
							onClick={onClick}
							fid='banks'
							active={currFid === 'banks'}
						/>
					</div>
					<div className='nav-group middle'>
						<NavButton
							childType='icon'
							src={faNewspaper}
							onClick={onClick}
							fid='news'
							active={currFid === 'news'}
						/>


					</div>
					<div className='nav-group bottom'>

						{props.userWeight > 0 && <NavButton
							onClick={onClick}
							childType='icon'
							src={faChartBar}
							fid='reports'
							active={currFid === 'reports'}
						/>}
						<NavButton
							onClick={onClick}
							childType='icon'
							src={faShoppingBasket}
							fid='market'
							active={currFid === 'market'}
						/>
						<NavButton
							onClick={onClick}
							childType='icon'
							src={faCog}
							fid='settings'
							active={currFid === 'settings'}
						/>
						<NavButton
							onClick={onClick}
							childType='icon'
							src={faUserAstronaut}
							fid='user'
							active={currFid === 'user'}
						/>
						<NavButton onClick={clickExitHandler} name='exit' childType='icon' src={faSignOutAlt} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(enhance(Sidebar));