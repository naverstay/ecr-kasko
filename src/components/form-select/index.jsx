import React, {Component} from "react";

import PropTypes from "prop-types";
import {Col, Select} from "antd";

const {Option} = Select;

class FormSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			controlValue: this.props.value || '',
		};
	}

	static propTypes = {
		onChangeCallback: PropTypes.func,
	};

	onChange = (value) => {
		this.setState({
			controlValue: value,
		});

		typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, value)
	};

	render() {
		const {value, controlName, span, placeholder, options} = this.props;

		let slct = <>
			<Select
				name={controlName}
				dropdownClassName="select_dropdown_v1"
				className={"w_100p custom_placeholder FormSelect " + (this.state.controlValue.length ? "" : " _empty")}
				placeholder=""
				onChange={this.onChange}
				value={this.state.controlValue}
			>
				{(options && options.length) ? options.map((e, i) =>
					<Option key={i} value={e}>{e}</Option>) : null}
			</Select>
			{placeholder ? <div className="float_placeholder">{placeholder}</div> : null}
		</>
		
		return (
			span === null ? 
				<>
					{slct}
				</>
				:
				<Col span={span}>
					{slct}
				</Col>
		);
	}
}

export default FormSelect;
