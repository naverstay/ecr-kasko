import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import Topbar from './topbar';

class Navbar extends Component {
	static propTypes = {
		innerWidth: PropTypes.number
	};

	state = { width: window.innerWidth };

	render() {
		const bar = this.props.innerWidth > 1200 ? <Sidebar sidebarHovered={this.props.sidebarHovered} updateSidebarState={this.props.updateSidebarState} /> : <Topbar />;
		return <>{bar}</>;
	}
}

export default Navbar;
