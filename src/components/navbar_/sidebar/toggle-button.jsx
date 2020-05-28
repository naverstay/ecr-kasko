import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navbarFpToggle } from '../../../store/navbar';

const enhance = connect(
	({ navbar }) => ({
		isFirstPanelOpen: navbar.isFirstPanelOpen,
		activeNav: navbar.activeNav,
	}),
	{
		navbarFpToggle,
	}
);

class ToggleButton extends PureComponent {
	static propTypes = {
		isFirstPanelOpen: PropTypes.bool,
	};

	toggleHandler = () => {
		this.props.navbarFpToggle(this.props.isFirstPanelOpen);
	};

	render() {
		return (
			<div
				className='sidebar-nav__toggle-button'
				onClick={this.toggleHandler}
			></div>
		);
	}
}

export default enhance(ToggleButton);
