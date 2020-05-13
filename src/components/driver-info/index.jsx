import React, {Component} from "react";
import {Input, Col, Row, Select, DatePicker, Checkbox} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from "moment";
import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";

const {Option} = Select;

class DriverInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			driverLicensePrev: false,
			driverLastName: '',
			driverFirstName: '',
			driverFarthersName: '',
			driverPhone: '',
			driverEmail: '',
			driverLicenseStart: '',
			driverLicenseFirst: '',
			driverBirthday: '',
			driverLicenseDepartment: '',
			driverLicenseID: '',
			driverLicenseNumber: '',
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

	onDriverLicenseStartChange = e => {
		this.setState({driverLicenseStart: e})
	};

	onDriverLicenseFirstChange = e => {
		this.setState({driverLicenseFirst: e})
	};

	onDriverLicenseIDChange = e => {
		this.setState({driverLicenseID: e.target.value})
	};

	onDriverLicenseNumberChange = e => {
		this.setState({driverLicenseNumber: e.target.value})
	};

	onDriverChildrenCountChange = e => {
		this.setState({driverChildrenCount: e.target.value})
	};

	onDriverPhoneChange = e => {
		this.setState({driverPhone: e.target.value})
	};

	onDriverEmailChange = e => {
		this.setState({driverEmail: e.target.value})
	};
	
	onDriverLicenseDepartmentChange = e => {
		this.setState({driverLicenseDepartment: e.target.value})
	};
	
	onDriverLastNameChange = e => {
		this.setState({driverLastName: e.target.value})
	};

	onDriverFirstNameChange = e => {
		this.setState({driverFirstName: e.target.value})
	};

	onDriverFarthersNameChange = e => {
		this.setState({driverFarthersName: e.target.value})
	};
	
	render() {
		
		return (
			<div className="driver-info">
				<div className="driver-info__caption">Данные водителя</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col className="check_v3" span={6}>
						<Checkbox>Страхователь</Checkbox>
					</Col>
					<Col className="check_v3" span={6}>
						<Checkbox>Собственник</Checkbox>
					</Col>
				</Row>
				
				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.driverLastName + '').length ? "" : " _empty")}
							   value={this.state.driverLastName}
							   onChange={this.onDriverLastNameChange} defaultValue=""/>
						<div className="float_placeholder">Фамилия</div>
					</Col>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.driverFirstName + '').length ? "" : " _empty")}
							   value={this.state.driverFirstName}
							   onChange={this.onDriverFirstNameChange} defaultValue=""/>
						<div className="float_placeholder">Имя</div>
					</Col>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.driverFarthersName + '').length ? "" : " _empty")}
							   value={this.state.driverFarthersName}
							   onChange={this.onDriverFarthersNameChange} defaultValue=""/>
						<div className="float_placeholder">Отчество</div>
					</Col>
					<Col span={6}>
						<DatePicker value={this.state.driverBirthday ? moment(this.state.driverBirthday) : null}
									onChange={this.onDriverBirthdayChange} placeholder=""
									className={"w_100p hide_picker_icon" + (this.state.driverBirthday && this.state.driverBirthday._isAMomentObject ? "" : " _empty")}/>
						<div className="float_placeholder">Дата рождения</div>
					</Col>
				</Row>
				
				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.driverPhone + '').length ? "" : " _empty")}
							   value={this.state.driverPhone}
							   onChange={this.onDriverPhoneChange} defaultValue=""/>
						<div className="float_placeholder">Мобильный телефон</div>
					</Col>
					<Col span={6}>
						
					</Col>
					<Col span={12}>
						<Input className={"w_100p" + ((this.state.driverEmail + '').length ? "" : " _empty")}
							   value={this.state.driverEmail}
							   onChange={this.onDriverEmailChange} defaultValue=""/>
						<div className="float_placeholder">Емейл</div>
					</Col>
				</Row>

				<div className="driver-info__caption">Водительское удостоверение</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={3}>
						<Input className={"w_100p" + ((this.state.driverLicenseID + '').length ? "" : " _empty")}
							   value={this.state.driverLicenseID}
							   onChange={this.onDriverLicenseIDChange} defaultValue=""/>
						<div className="float_placeholder">Серия</div>
					</Col>
					<Col span={3}>
						<Input className={"w_100p" + ((this.state.driverLicenseNumber + '').length ? "" : " _empty")}
							   value={this.state.driverLicenseNumber}
							   onChange={this.onDriverLicenseNumberChange} defaultValue=""/>
						<div className="float_placeholder">Номер</div>
					</Col>
					<Col span={6}>
						<DatePicker value={this.state.driverLicenseStart ? moment(this.state.driverLicenseStart) : null}
									onChange={this.onDriverLicenseStartChange} placeholder=""
									className={"w_100p hide_picker_icon" + (this.state.driverLicenseStart && this.state.driverLicenseStart._isAMomentObject ? "" : " _empty")}/>
						<div className="float_placeholder">Дата выдачи</div>
					</Col>
					<Col span={12}>
						<Input className={"w_100p" + ((this.state.driverLicenseDepartment + '').length ? "" : " _empty")}
							   value={this.state.driverLicenseDepartment}
							   onChange={this.onDriverLicenseDepartmentChange} defaultValue=""/>
						<div className="float_placeholder">Кем выдано</div>
					</Col>
				</Row>
				
				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<DatePicker disabled={!this.state.driverLicensePrev ? "disabled" : ""} value={this.state.driverLicenseFirst ? moment(this.state.driverLicenseFirst) : null}
									onChange={this.onDriverLicenseFirstChange} placeholder=""
									className={"w_100p hide_picker_icon" + (this.state.driverLicenseFirst && this.state.driverLicenseFirst._isAMomentObject ? "" : " _empty")}/>
						<div className="float_placeholder">Дата выдачи первого ВУ</div>
					</Col>
					<Col className="checkbox_middle check_v3" span={6}>
						<Checkbox onChange={this.onDriverLicensePrevChange}>Предыдущее ВУ</Checkbox>
						<div className="checkbox_middle--hint" >Не обязательно</div>
					</Col>
				</Row>

				<div className="driver-info__caption">Семейное положение</div>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Select
							className={"w_100p" + (this.state.driverFamilyStatus.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onDriverFamilyStatusChange}
							value={this.state.driverFamilyStatus}
						>
							{this.state.driverFamilyStatusList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Семейное положение</div>
					</Col>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.driverChildrenCount + '').length ? "" : " _empty")}
							   value={this.state.driverChildrenCount}
							   onChange={this.onDriverChildrenCountChange} defaultValue=""/>
						<div className="float_placeholder">Кол-во детей младше 21</div>
					</Col>
				</Row>
				
				<div className="kasko-car-select__controls ant-row-center">
					<div className="driver-info__add gl_link">Добавить водителя</div>
				</div>
				
				<div className="driver-info__caption">Проверьте лиц, включенных в полис</div>

				<InsurancePolicy />

				<div className="kasko-car-select__controls ant-row-center">
					<div className="driver-info__add gl_link">Добавить водителя</div>
				</div>

				<div className="kasko-car-select__controls ant-row-center">
					<div className="kasko-car-select__controls--group">
						<Link to="/" className={"gl_link"}>
							Отмена
						</Link>
						<Link to="/" className={"ant-btn btn_green btn_middle"}>
							Сохранить
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default DriverInfo;