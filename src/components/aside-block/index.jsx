import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class AsideBlock extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
	};

	render() {
		const {children} = this.props;
		return (
			<div className="aside-block">
				{children}
			</div>
		);
	}
}

export default AsideBlock;