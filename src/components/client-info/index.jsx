import React, {Component} from "react";
import {Input, Col, Row, Checkbox} from "antd";
import './style.scss';
import PropTypes from "prop-types";
//import moment from "moment";
import Inputmask from "inputmask";

class ClientInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			driverLicensePrev: false,
			carVIN: '',
			carPTS: '',
			carPTSStart: '',
			driverPhone: '',
			clientLicenseDepartment: '',
			clientAddress: '',
			clientFlat: '',
			clientLicenseStart: '',
			driverLicenseFirst: '',
			driverBirthday: '',
			clientLicenseDepID: '',
			clientLicenseID: '',
			clientLicenseNumber: '',
			driverChildrenCount: '',
			driverFamilyStatus: '',
			driverFamilyStatusList: [
				"Женат/Замужем",
				"Холост",
				"В разводе",
				"Вдовец"
			]
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		fullCalculation: PropTypes.bool,
		innerWidth: PropTypes.number
	};

	onDriverFamilyStatusChange = value => {
		this.setState({driverFamilyStatus: value})
	};

	onDriverLicensePrevChange = e => {
		this.setState({driverLicensePrev: e.target.checked})
	};

	onDriverBirthdayChange = e => {
		this.setState({driverBirthday: e})
	};

	onClientLicenseStartChange = e => {
		this.setState({clientLicenseStart: e.target.value})
	};

	onDriverLicenseFirstChange = e => {
		this.setState({driverLicenseFirst: e.target.value})
	};

	onClientLicenseIDIDChange = e => {
		this.setState({clientLicenseID: e.target.value})
	};

	onClientLicenseNumberChange = e => {
		this.setState({clientLicenseNumber: e.target.value})
	};

	onDriverChildrenCountChange = e => {
		this.setState({driverChildrenCount: e.target.value})
	};

	onDriverPhoneChange = e => {
		this.setState({driverPhone: e.target.value})
	};

	onclientLicenseDepartmentChange = e => {
		this.setState({clientLicenseDepartment: e.target.value})
	};

	onClientAddressChange = e => {
		this.setState({clientAddress: e.target.value})
	};
	
	onClientFlatChange = e => {
		this.setState({clientFlat: e.target.value})
	};
	
	onClientLicenseDepIDChange = e => {
		this.setState({clientLicenseDepID: e.target.value})
	};
	
	onCarVINChange = e => {
		this.setState({carVIN: e.target.value})
	};

	onCarPTSChange = e => {
		this.setState({carPTS: e.target.value})
	};

	onCarPTSStartChange = e => {
		this.setState({carPTSStart: e.target.value})
	};

	componentDidUpdate() {
		document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
			let mask = {}
			inp.dataset.inputmask.split(',').forEach((m) => {
				let key = m.split(':')[0]
				mask[key] = m.split(':')[1]
			})
			Inputmask(mask).mask(inp);
		})
	};
	
	render() {
		// vin [A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}

		const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
		const clientLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
		const clientLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"
		const carVINMask = "'alias': 'vin', 'placeholder': '', 'clearIncomplete': 'false'"
		//const dateFormat = "DD.MM.YY"
		
		return (
			<div className="driver-info">
				<div className="driver-info__caption">Автомобиль</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Input
							data-inputmask={carVINMask}
							   className={"w_100p input-error custom_placeholder " + ((this.state.carVIN + '').length ? "" : " _empty")}
							   value={this.state.carVIN}
							   onChange={this.onCarVINChange} defaultValue=""/>
						<div className="float_placeholder">VIN</div>
					</Col>
					<Col span={6}>
						<Input className={"w_100p input-error custom_placeholder " + ((this.state.carPTS + '').length ? "" : " _empty")}
							   value={this.state.carPTS}
							   onChange={this.onCarPTSChange} defaultValue=""/>
						<div className="float_placeholder">ПТС</div>
					</Col>
					<Col span={6}>
						{/*<DatePicker format={dateFormat}*/}
						{/*			value={this.state.carPTSStart ? moment(this.state.carPTSStart) : null}*/}
						{/*			onChange={this.onCarPTSStartChange} placeholder=""*/}
						{/*			className={"w_100p hide_picker_icon wrapper-error" + (this.state.carPTSStart && this.state.carPTSStart._isAMomentObject ? "" : " _empty")}/>*/}
						<Input
							data-inputmask={dateFormatMask}
							className={"w_100p input-error custom_placeholder " + ((this.state.carPTSStart + '').length ? "" : " _empty")}
							   value={this.state.carPTSStart}
							   onChange={this.onCarPTSStartChange} defaultValue=""/>
						<div className="float_placeholder">Дата выдачи ПТС</div>
					</Col>
				</Row>

				<div className="driver-info__caption">Фомин Сергей Михайлович</div>

				<div className="driver-info__caption">Паспорт</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={3}>
						<Input data-inputmask={clientLicenseIDMask}
							   className={"w_100p input-error custom_placeholder " + ((this.state.clientLicenseID + '').length ? "" : " _empty")}
							   value={this.state.clientLicenseID}
							   onChange={this.onClientLicenseIDIDChange} defaultValue=""/>
						<div className="float_placeholder">Серия</div>
					</Col>
					<Col span={3}>
						<Input data-inputmask={clientLicenseNumberMask}
							   className={"w_100p input-error custom_placeholder " + ((this.state.clientLicenseNumber + '').length ? "" : " _empty")}
							   value={this.state.clientLicenseNumber}
							   onChange={this.onClientLicenseNumberChange} defaultValue=""/>
						<div className="float_placeholder">Номер</div>
					</Col>
					<Col span={6}>
						{/*<DatePicker format={dateFormat}*/}
						{/*	value={this.state.clientLicenseStart ? moment(this.state.clientLicenseStart) : null}*/}
						{/*	onChange={this.onClientLicenseStartChange} placeholder=""*/}
						{/*	className={"w_100p wrapper-error hide_picker_icon" + (this.state.clientLicenseStart && this.state.clientLicenseStart._isAMomentObject ? "" : " _empty")}/>*/}
						<Input data-inputmask={dateFormatMask}
							   className={"w_100p input-error custom_placeholder " + ((this.state.clientLicenseStart + '').length ? "" : " _empty")}
							   value={this.state.clientLicenseStart}
							   onChange={this.onClientLicenseStartChange} defaultValue=""/>
						<div className="float_placeholder">Дата выдачи</div>
					</Col>
					<Col span={12}>
						<Input className={"w_100p input-error custom_placeholder " + ((this.state.clientLicenseDepID + '').length ? "" : " _empty")}
							   value={this.state.clientLicenseDepID}
							   onChange={this.onClientLicenseDepIDChange} defaultValue=""/>
						<div className="float_placeholder">Код подразделения</div>
					</Col>
				</Row>
		
				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={24}>
						<Input className={"w_100p input-error custom_placeholder " + ((this.state.clientLicenseDepartment + '').length ? "" : " _empty")}
							   value={this.state.clientLicenseDepartment}
							   onChange={this.onclientLicenseDepartmentChange} defaultValue=""/>
						<div className="float_placeholder">Кем выдан</div>
					</Col>
				</Row>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						{/*<DatePicker format={dateFormat}*/}
						{/*			value={this.state.driverLicenseFirst ? moment(this.state.driverLicenseFirst) : null}*/}
						{/*			onChange={this.onDriverLicenseFirstChange} placeholder=""*/}
						{/*			className={"w_100p wrapper-error hide_picker_icon" + (this.state.driverLicenseFirst && this.state.driverLicenseFirst._isAMomentObject ? "" : " _empty")}/>*/}
						<Input data-inputmask={dateFormatMask}
							className={"w_100p input-error" + ((this.state.driverLicenseFirst + '').length ? "" : " _empty")}
							value={this.state.driverLicenseFirst}
							onChange={this.onDriverLicenseFirstChange} defaultValue=""/>
						<div className="float_placeholder">{'Дата выдачи \n первого ВУ'}</div>
					</Col>
				</Row>

				<div className="driver-info__caption">Адрес постоянной регистрации</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={20}>
						<Input className={"w_100p input-error custom_placeholder " + ((this.state.clientAddress + '').length ? "" : " _empty")}
							   value={this.state.clientAddress}
							   onChange={this.onClientAddressChange} defaultValue=""/>
						<div className="float_placeholder">Адрес</div>
					</Col>
					{/*<Col span={4}>*/}
					{/*	<Input className={"w_100p input-error custom_placeholder " + ((this.state.clientFlat + '').length ? "" : " _empty")}*/}
					{/*		   value={this.state.clientFlat}*/}
					{/*		   onChange={this.onClientFlatChange} defaultValue=""/>*/}
					{/*	<div className="float_placeholder">Квартира</div>*/}
					{/*</Col>*/}
				</Row>
				
				<Row gutter={20}>
					<Col className="checkbox_middle check_v3">
						<Checkbox>Вывести адрес раздельно по полям</Checkbox>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ClientInfo;
