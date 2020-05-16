import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";
import Inputmask from "inputmask";

const {Option} = Select;

class DriverInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientLicenseDepartment: '',
			clientAddress: '',
			clientFlat: '',
			clientPostCode: '',
			clientRegistrationStart: '',
			clientLicenseStart: '',
			clientLicenseDepID: '',
			clientLicenseID: '',
			clientLicenseNumber: '',
			driverLicensePrev: false,
			driverProgenyNess: false,
			driverLastName: '',
			driverFirstName: '',
			driverFarthersName: '',
			driverPhone: '',
			driverEmail: '',
			driverLicenseStart: '',
			driverExperienceStart: '',
			driverLicenseFirst: '',
			driverBirthday: '',
			driverLicenseDepartment: '',
			driverLicenseID: '',
			driverLicenseNumber: '',
			driverPrevLicenseStart: '',
			driverPrevLicenseID: '',
			driverPrevLicenseNumber: '',
			driverChildrenCount: '',
			driverCount: 1,
			clientFlatType: '',
			driverFamilyStatus: '',
			driverFamilyStatusList: [
				"Женат/Замужем",
				"Холост",
				"В разводе",
				"Вдовец"
			],
			clientFlatTypeList: [
				"Дом",
				"Квартира"
			]
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		fullCalculation: PropTypes.bool,
		innerWidth: PropTypes.number
	};
	
	removeDriver = (index) => {
		let drv = this.state.driverCount

		drv--
		
		this.setState({driverCount: (drv || 1)})
	};
	
	addDriver = e => {
		let drv = this.state.driverCount

		drv++
		
		this.setState({driverCount: (drv)})
	};

	onClientFlatTypeChange = value => {
		this.setState({clientFlatType: value})
	};
	
	onDriverFamilyStatusChange = value => {
		this.setState({driverFamilyStatus: value})
	};

	onDriverLicensePrevChange = e => {
		this.setState({driverLicensePrev: e.target.checked})
	};

	onDriverProgenyNessChange = e => {
		this.setState({driverProgenyNess: e.target.checked})
	};

	onDriverBirthdayChange = e => {
		this.setState({driverBirthday: e.target.value})
	};

	onDriverLicenseStartChange = e => {
		this.setState({driverLicenseStart: e.target.value})
	};

	onDriverExperienceStartChange = e => {
		this.setState({driverExperienceStart: e.target.value})
	};

	onDriverLicenseFirstChange = e => {
		this.setState({driverLicenseFirst: e.target.value})
	};

	onDriverLicenseIDChange = e => {
		this.setState({driverLicenseID: e.target.value})
	};

	onDriverLicenseNumberChange = e => {
		this.setState({driverLicenseNumber: e.target.value})
	};

	onDriverPrevLicenseIDChange = e => {
		this.setState({driverPrevLicenseID: e.target.value})
	};

	onDriverLicenseNumberPrevChange = e => {
		this.setState({driverPrevLicenseNumber: e.target.value})
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

	onDriverPrevLicenseStartChange = e => {
		this.setState({driverPrevLicenseStart: e.target.value})
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

	onclientLicenseDepartmentChange = e => {
		this.setState({clientLicenseDepartment: e.target.value})
	};

	onClientAddressChange = e => {
		this.setState({clientAddress: e.target.value})
	};

	onClientFlatChange = e => {
		this.setState({clientFlat: e.target.value})
	};

	onClientPostCodeChange = e => {
		this.setState({clientPostCode: e.target.value})
	};

	onClientRegistrationStartChange = e => {
		this.setState({clientRegistrationStart: e.target.value})
	};

	onClientLicenseDepIDChange = e => {
		this.setState({clientLicenseDepID: e.target.value})
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
		let {fullCalculation, allFields} = this.props
		//const dateFormat = "DD.MM.YY"
		const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
		const driverPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
		const driverEmailMask = "'alias': 'email', 'showMaskOnHover': 'false'"
		const driverLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
		const driverLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"

		const clientLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
		const clientLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"
		
		
		let drivers = []
		
		for (let drv = 0; drv < this.state.driverCount; drv++) {
			drivers.push(drv)
		}

		console.log('drivers', drivers);
		
		return (
			<div className="driver-info">
				{
					drivers.length ? drivers.map((d) => {
						return (<div key={d} className="driver-info__item">
							<div className="driver-info__caption">Личная информация</div>

							{/*<Row className="kasko-car-select__controls" gutter={20}>*/}
							{/*	<Col className="check_v3" span={6}>*/}
							{/*		<Checkbox>Страхователь</Checkbox>*/}
							{/*	</Col>*/}
							{/*	<Col className="check_v3" span={6}>*/}
							{/*		<Checkbox>Собственник</Checkbox>*/}
							{/*	</Col>*/}
							{/*</Row>*/}

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input
										className={"w_100p" + ((this.state.driverLastName + '').length ? "" : " _empty")}
										value={this.state.driverLastName}
										onChange={this.onDriverLastNameChange} defaultValue=""/>
									<div className="float_placeholder">Фамилия</div>
								</Col>
								<Col span={6}>
									<Input
										className={"w_100p" + ((this.state.driverFirstName + '').length ? "" : " _empty")}
										value={this.state.driverFirstName}
										onChange={this.onDriverFirstNameChange} defaultValue=""/>
									<div className="float_placeholder">Имя</div>
								</Col>
								<Col span={6}>
									<Input
										className={"w_100p" + ((this.state.driverFarthersName + '').length ? "" : " _empty")}
										value={this.state.driverFarthersName}
										onChange={this.onDriverFarthersNameChange} defaultValue=""/>
									<div className="float_placeholder">Отчество</div>
								</Col>
								<Col span={6}>
									{/*<DatePicker format={dateFormat} value={this.state.driverBirthday ? moment(this.state.driverBirthday) : null}*/}
									{/*			onChange={this.onDriverBirthdayChange} placeholder=""*/}
									{/*			className={"w_100p hide_picker_icon" + (this.state.driverBirthday && this.state.driverBirthday._isAMomentObject ? "" : " _empty")}/>*/}
									<Input data-inputmask={dateFormatMask}
										   className={"w_100p" + ((this.state.driverBirthday + '').length ? "" : " _empty")}
										   value={this.state.driverBirthday}
										   onChange={this.onDriverBirthdayChange} defaultValue=""/>
									<div className="float_placeholder">Дата рождения</div>
								</Col>
							</Row>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1"
										className={"w_100p" + (this.state.driverFamilyStatus.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onDriverFamilyStatusChange}
										value={this.state.driverFamilyStatus}
									>
										{this.state.driverFamilyStatusList ? this.state.driverFamilyStatusList.map((e, i) =>
											<Option key={i}
													value={e}>{e}</Option>) : ""}
									</Select>
									<div className="float_placeholder">Семейное положение</div>
								</Col>
								<Col className="checkbox_middle check_v3" span={6}>
									<Checkbox onChange={this.onDriverProgenyNessChange}>Есть дети</Checkbox>
								</Col>
								
								{
									this.state.driverProgenyNess ?
									<Col span={6}>
										<Input
											className={"w_100p" + ((this.state.driverChildrenCount + '').length ? "" : " _empty")}
											value={this.state.driverChildrenCount}
											onChange={this.onDriverChildrenCountChange} defaultValue=""/>
										<div className="float_placeholder">Кол-во детей младше 21</div>
									</Col>
									: ""
								}
							</Row>
								
								{
									fullCalculation ? 
										<>

											<div className="driver-info__caption">Паспорт</div>

											<Row className="kasko-car-select__controls" gutter={20}>
												<Col span={3}>
													<Input data-inputmask={clientLicenseIDMask}
														   className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientLicenseID + '').length ? "" : " _empty")}
														   value={this.state.clientLicenseID}
														   onChange={this.onClientLicenseIDIDChange} defaultValue=""/>
													<div className="float_placeholder">Серия</div>
												</Col>
												<Col span={3}>
													<Input data-inputmask={clientLicenseNumberMask}
														   className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientLicenseNumber + '').length ? "" : " _empty")}
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
														   className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientLicenseStart + '').length ? "" : " _empty")}
														   value={this.state.clientLicenseStart}
														   onChange={this.onClientLicenseStartChange} defaultValue=""/>
													<div className="float_placeholder">Дата выдачи</div>
												</Col>
												<Col span={6}>
													<Input
														className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientLicenseDepID + '').length ? "" : " _empty")}
														value={this.state.clientLicenseDepID}
														onChange={this.onClientLicenseDepIDChange} defaultValue=""/>
													<div className="float_placeholder">Код подразделения</div>
												</Col>
											</Row>

											<Row className="kasko-car-select__controls" gutter={20}>
												<Col span={24}>
													<Input
														className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientLicenseDepartment + '').length ? "" : " _empty")}
														value={this.state.clientLicenseDepartment}
														onChange={this.onclientLicenseDepartmentChange}
														defaultValue=""/>
													<div className="float_placeholder">Кем выдан</div>
												</Col>
											</Row>

											<div className="driver-info__caption">Адрес регистрации</div>

											<Row className="kasko-car-select__controls" gutter={20}>
												<Col span={18}>
													<Input
														className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientAddress + '').length ? "" : " _empty")}
														value={this.state.clientAddress}
														onChange={this.onClientAddressChange} defaultValue=""/>
													<div className="float_placeholder">Адрес</div>
												</Col>
												<Col span={3}>
													<Input
														className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientFlat + '').length ? "" : " _empty")}
														value={this.state.clientFlat}
														onChange={this.onClientFlatChange} defaultValue=""/>
													<div className="float_placeholder">Квартира</div>
												</Col>
												<Col span={3}>
													<Input
														className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientPostCode + '').length ? "" : " _empty")}
														value={this.state.clientPostCode}
														onChange={this.onClientPostCodeChange} defaultValue=""/>
													<div className="float_placeholder">Индекс</div>
												</Col>
											</Row>
											
											<Row className="kasko-car-select__controls" gutter={20}>
												<Col span={6}>
													<Input data-inputmask={dateFormatMask}
														   className={"w_100p " + (allFields ? "input-error" : "") + ((this.state.clientRegistrationStart + '').length ? "" : " _empty")}
														   value={this.state.clientRegistrationStart}
														   onChange={this.onClientRegistrationStartChange} defaultValue=""/>
													<div className="float_placeholder">Дата регистрации</div>
												</Col>
												<Col span={12}>
													<Select
														dropdownClassName="select_dropdown_v1"
														className={"w_100p " + (allFields ? "wrapper-error" : "") + (this.state.clientFlatType.length ? "" : " _empty")}
														placeholder=""
														onChange={this.onClientFlatTypeChange}
														value={this.state.clientFlatType}
													>
														{this.state.clientFlatTypeList ? this.state.clientFlatTypeList.map((e, i) =>
															<Option key={i}
																	value={e}>{e}</Option>) : ""}
													</Select>
													<div className="float_placeholder">Тип жилья</div>
												</Col>
											</Row>
										</>
										: ""
								}
								
							<div className="driver-info__caption">Водительское удостоверение</div>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={3}>
									<Input data-inputmask={driverLicenseIDMask}
										   className={"w_100p" + ((this.state.driverLicenseID + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseID}
										   onChange={this.onDriverLicenseIDChange} defaultValue=""/>
									<div className="float_placeholder">Серия</div>
								</Col>
								<Col span={3}>
									<Input data-inputmask={driverLicenseNumberMask}
										   className={"w_100p" + ((this.state.driverLicenseNumber + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseNumber}
										   onChange={this.onDriverLicenseNumberChange} defaultValue=""/>
									<div className="float_placeholder">Номер</div>
								</Col>
								<Col span={6}>
									{/*<DatePicker format={dateFormat}*/}
									{/*	value={this.state.driverLicenseStart ? moment(this.state.driverLicenseStart) : null}*/}
									{/*	onChange={this.onDriverLicenseStartChange} placeholder=""*/}
									{/*	className={"w_100p hide_picker_icon" + (this.state.driverLicenseStart && this.state.driverLicenseStart._isAMomentObject ? "" : " _empty")}/>*/}
									<Input data-inputmask={dateFormatMask}
										   className={"w_100p" + ((this.state.driverLicenseStart + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseStart}
										   onChange={this.onDriverLicenseStartChange} defaultValue=""/>
									<div className="float_placeholder">Дата выдачи</div>
								</Col>
								<Col span={6}>
									<Input data-inputmask={dateFormatMask}
										className={"w_100p" + ((this.state.driverExperienceStart + '').length ? "" : " _empty")}
										value={this.state.driverExperienceStart}
										onChange={this.onDriverExperienceStartChange} defaultValue=""/>
									<div className="float_placeholder">Дата начала стажа</div>
								</Col>
								{/*<Col span={12}>*/}
								{/*	<Input*/}
								{/*		className={"w_100p" + ((this.state.driverLicenseDepartment + '').length ? "" : " _empty")}*/}
								{/*		value={this.state.driverLicenseDepartment}*/}
								{/*		onChange={this.onDriverLicenseDepartmentChange} defaultValue=""/>*/}
								{/*	<div className="float_placeholder">Кем выдано</div>*/}
								{/*</Col>*/}
							</Row>
								
							<div className="kasko-car-select__controls">
								<Checkbox onChange={this.onDriverLicensePrevChange}>Предыдущее ВУ
									<span className="checkbox_middle--hint">(Не обязательно)</span></Checkbox>
							</div>
								
							{this.state.driverLicensePrev ?
								<Row className="kasko-car-select__controls" gutter={20}>
									{/*<Col span={6}>*/}
										{/*<DatePicker format={dateFormat} */}
										{/*			//disabled={!this.state.driverLicensePrev ? "disabled" : ""}*/}
										{/*			value={this.state.driverLicenseFirst ? moment(this.state.driverLicenseFirst) : null}*/}
										{/*			onChange={this.onDriverLicenseFirstChange} placeholder=""*/}
										{/*			className={"w_100p hide_picker_icon" + (this.state.driverLicenseFirst && this.state.driverLicenseFirst._isAMomentObject ? "" : " _empty")}/>*/}
									{/*	<Input data-inputmask={dateFormatMask}*/}
									{/*		   className={"w_100p" + ((this.state.driverLicenseFirst + '').length ? "" : " _empty")}*/}
									{/*		   value={this.state.driverLicenseFirst}*/}
									{/*		   onChange={this.onDriverLicenseFirstChange} defaultValue=""/>*/}
									{/*	<div className="float_placeholder">{'Дата выдачи \n первого ВУ'}</div>*/}
									{/*</Col>*/}
									{/*<Col className="checkbox_middle check_v3" span={6}>*/}
									{/*	<Checkbox onChange={this.onDriverLicensePrevChange}>Предыдущее ВУ</Checkbox>*/}
									{/*	<div className="checkbox_middle--hint">Не обязательно</div>*/}
									{/*</Col>*/}

									<Col span={3}>
										<Input data-inputmask={driverLicenseIDMask}
											   className={"w_100p" + ((this.state.driverPrevLicenseID + '').length ? "" : " _empty")}
											   value={this.state.driverPrevLicenseID}
											   onChange={this.onDriverPrevLicenseIDChange} defaultValue=""/>
										<div className="float_placeholder">Серия</div>
									</Col>
									<Col span={3}>
										<Input data-inputmask={driverLicenseNumberMask}
											   className={"w_100p" + ((this.state.driverPrevLicenseNumber + '').length ? "" : " _empty")}
											   value={this.state.driverPrevLicenseNumber}
											   onChange={this.onDriverLicenseNumberPrevChange}
											   defaultValue=""/>
										<div className="float_placeholder">Номер</div>
									</Col>
									<Col span={6}>
										<Input data-inputmask={dateFormatMask}
											className={"w_100p" + ((this.state.driverPrevLicenseStart + '').length ? "" : " _empty")}
											value={this.state.driverPrevLicenseStart}
											onChange={this.onDriverPrevLicenseStartChange}
											defaultValue=""/>
										<div className="float_placeholder">Дата выдачи</div>
									</Col>
								</Row> : ""
							}

								<div className="driver-info__caption">Контакты</div>

								<Row className="kasko-car-select__controls" gutter={20}>
									<Col span={6}>
										<Input disabled="disabled"
											   className={"w_100p _empty"}
											   defaultValue=""/>
										<div className="float_placeholder">Фамилия И. Клиента</div>
									</Col>
									<Col span={6}>
										<Input data-inputmask={driverPhoneMask}
											   className={"w_100p" + ((this.state.driverPhone + '').length ? "" : " _empty")}
											   value={this.state.driverPhone}
											   onChange={this.onDriverPhoneChange} defaultValue=""/>
										<div className="float_placeholder">Мобильный телефон</div>
									</Col>
									<Col span={12}>
										<Input data-inputmask={driverEmailMask}
											   className={"w_100p" + ((this.state.driverEmail + '').length ? "" : " _empty")}
											   value={this.state.driverEmail}
											   onChange={this.onDriverEmailChange} defaultValue=""/>
										<div className="float_placeholder">Емейл</div>
									</Col>
								</Row>
								
								

							<div className="kasko-car-select__controls ant-row-center">
								{
									!d ?
										<div onClick={this.addDriver} className="driver-info__add gl_link">Добавить водителя</div>
										:
										<div onClick={this.removeDriver} className="driver-info__remove gl_link">Удалить водителя</div>
								}
							</div>
						</div>
						)
					}) : ""
				}
				
				<div className="driver-info__caption">Проверьте лиц, включенных в полис</div>

				<InsurancePolicy />

				<div className="kasko-car-select__controls ant-row-center">
					<div className="driver-info__add gl_link">Добавить водителя</div>
				</div>

				<div className="kasko-car-select__controls ant-row-center">
					<div className="kasko-car-select__controls--group">
						<div className="kasko-car-select__controls--group-l">
							<Link to="/offers" className={"gl_link"}>
								Отмена
							</Link>
						</div>
						<Link to="/payment" className={"ant-btn btn_green btn_middle"}>
							Сохранить
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default DriverInfo;
