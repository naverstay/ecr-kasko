import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {MenuLink} from "./MenuLink";

class SubMenu extends Component {
	static propTypes = {
		submenu: PropTypes.array,
		listClassName: PropTypes.string,
	};
	
	render () {
		const {submenu, listClassName} = this.props.props;

		const linksRender = (submenu ? submenu : []).map((link, i) => (
			<MenuLink
				key={`${link.title}-${link.to}-${i}`}
				navClassList={['submenu-link']}
				classList={link.classList}
				{...link}
			/>
		));
		
		return <ul className={'sidebar__body-list' + (listClassName ? ' ' + listClassName : '')}>{linksRender}</ul>;
	}
}

export default SubMenu;
