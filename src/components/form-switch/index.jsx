import React, {Component} from "react";

import PropTypes from "prop-types";
import {Switch} from "antd";

class FormSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			controlValue: this.props.value || false,
		};
	}
	
	static propTypes = {
		onChangeCallback: PropTypes.func,
	};
	
	onChange = (e) => {
		const val = !this.state.controlValue

		this.setState({controlValue: val})

		typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, val)
	};

	render() {
		const {className, leftText, rightText} = this.props;
		
		return (
			<div
				className={(className || "") + " kasko-car-select__calculation" + (this.state.controlValue ? ' active' : '')}>
				<span className="kasko-car-select__calculation--text">{leftText || ''}</span>
				<Switch
					checked={this.state.controlValue}
					className="kasko-car-select__calculation--switch"
					onChange={this.onChange}
				/>
				<span className="kasko-car-select__calculation--text">{rightText || ''}</span>
			</div>
		);
	}
}

export default FormSwitch;
