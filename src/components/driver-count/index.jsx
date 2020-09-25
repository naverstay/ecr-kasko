import React, {Component} from "react";
import {Col, Row, Checkbox, Tooltip} from "antd";

import './style.scss';
import PropTypes from "prop-types";

class DriverCount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedList: this.props.driverOptions,
			indeterminate: true,
			checkAll: false,
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number
	};

	onDriverOptionsChange = e => {
		let val = e.target.value
		let checkedList = this.state.checkedList.slice(0)

		if (e.target.checked) {
			checkedList.push(val)
		} else {
			const index = checkedList.indexOf(val);
			if (index > -1) {
				checkedList.splice(index, 1);
			}
		}
		
		this.setState({
			checkedList: checkedList,
			indeterminate: !!checkedList.length && checkedList.length < this.props.driverOptions.length,
			checkAll: false,
			paramsChanged: true
		});
	};

	onCheckAllChange = e => {
		let newChecked = e.target.checked ? this.props.driverOptions : []
		
		if (e.target.checked) {
			this.setState({
				checkedList: [],
				indeterminate: false,
				checkAll: e.target.checked,
			});
		}
	};
	
	render() {
		const {driverOptions, children, className} = this.props
		
		return (
			<div className={"kasko-car-select__controls check_v2 " + className}>
					<Row className={"w_100p"} gutter={20}>
						<Col className={"popup-visible"} span={3}/>
						<Col span={18}>
							<Row className={""} gutter={20}>
								{
									driverOptions.length ? driverOptions.map((c, i) =>
										<Col key={i}>
											<Checkbox
												onChange={this.onDriverOptionsChange}
												checked={this.state.checkedList.indexOf(c) > -1}
												value={c}>{c}
												<span className="driver-count__index">КБМ={i + 1}</span>
											</Checkbox>
										</Col>
									) : null
								}
								{
									<Col key={driverOptions.length}>
										<Tooltip overlayClassName="tooltip_v1" placement="top" title="Неограниченное количество водителей">
											<Checkbox
												indeterminate={this.state.indeterminate}
												checked={this.state.checkAll}
												onChange={this.onCheckAllChange}>Мультидрайв</Checkbox>
										</Tooltip>
									</Col>
								}
								{children}
							</Row>
						</Col>
					</Row>
			</div>
		);
	}
}

export default DriverCount;
