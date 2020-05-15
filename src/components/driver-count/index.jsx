import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Checkbox} from "antd";

class DriverCount extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number
	};
	
	onDriverOptionsChange = (checkedValues) => {
		console.log('checked = ', checkedValues);

		this.setState({
			paramsChanged: true
		})
	}
	
	render() {
		const {driverOptions} = this.props
		
		return (
			<div className="kasko-car-select__controls check_v2">
				<Checkbox.Group options={driverOptions} onChange={this.onDriverOptionsChange}/>
			</div>
		);
	}
}

export default DriverCount;

