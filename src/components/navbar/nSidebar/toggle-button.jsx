import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { navbarFixToggle } from '../../../store/navbar';

const enhance = connect(
	({ navbar }) => ({
		isNavFixed: navbar.isNavFixed,
	}),
	{
		navbarFixToggle,
	}
);

class ToggleButton extends PureComponent {
	static propTypes = {
		isFirstPanelOpen: PropTypes.bool,
	};

	toggleHandler = () => {
		this.props.navbarFixToggle(!this.props.isNavFixed);
	};	

	render() {
		const icon = this.props.isNavFixed ? faAngleDoubleLeft : faAngleDoubleRight;
		return <FontAwesomeIcon icon={icon} onClick={this.toggleHandler} />;		
	}
}

export default enhance(ToggleButton);
