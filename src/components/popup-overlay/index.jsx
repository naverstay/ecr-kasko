import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";


class PopupOverlay extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
	};

	render() {
		const {children} = this.props;
		return (
			<div className="popup-overlay">
				{children}
			</div>
		);
	}
}

export default PopupOverlay;
