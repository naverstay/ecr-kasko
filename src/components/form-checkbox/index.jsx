import React, {Component} from "react";

import PropTypes from "prop-types";
import {Col, Checkbox} from "antd";

class FormCheckbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			controlChecked: this.props.checked,
		};
	}
	
	static propTypes = {
		onChangeCallback: PropTypes.func,
	};
	
	onChange = (e) => {
		const val = e.target.checked

		this.setState({controlChecked: val})

		typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, val)
	};

	render() {
		const {value, controlName, span, text, className} = this.props;
		
		return (
			<Col className={className} span={span}>
				<Checkbox name={controlName} checked={this.state.controlChecked} value={value} onChange={this.onChange}>{text}</Checkbox>
			</Col>
		);
	}
}

export default FormCheckbox;
