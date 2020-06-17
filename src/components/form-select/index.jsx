import React, {Component} from "react";

import PropTypes from "prop-types";
import {Col, Input, Select} from "antd";

const {Option} = Select;

class FormSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			controlValue: '' + (this.props.value || ''),
		};
	}

	static propTypes = {
		onChangeCallback: PropTypes.func,
	};

	onChange = (value) => {
		this.setState({
			controlValue: value + '',
		});

		typeof this.props.onChangeCallback === 'function' && this.props.onChangeCallback(this.props.controlName, value)
	};

	render() {
		const {cellClass, controlName, span, placeholder, options, dropdownClassName, className, disabled} = this.props;

		console.log('controlValue', this.state.controlValue, '#');
		
		let slct = <>
			<Select
				name={controlName}
				disabled={disabled || null}
				dropdownClassName={dropdownClassName || "select_dropdown_v1"}
				className={(className || "") + " w_100p FormSelect" + (placeholder ? " custom_placeholder" : " no_placeholder") + (this.state.controlValue.length ? "" : " _empty")}
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
				<Col className={cellClass || ''} span={span}>
					{slct}
				</Col>
		);
	}
}

export default FormSelect;
