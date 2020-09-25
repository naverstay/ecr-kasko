import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox, Button} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";
import Inputmask from "inputmask";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import FormCheckbox from "../form-checkbox";

const {Option} = Select;

class DriverInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFields: [],
			clientLicenseDepartment: '',
			clientAddress: '',
			clientFlat: '',
			clientPostCode: '',
			clientRegistrationStart: '',
			clientLicenseStart: '',
			clientLicenseDepID: '',
			clientLicenseID: '',
			clientLicenseNumber: '',
			driverPassport: '',
			driverPassportStart: '',
			driverAnotherDocument: '',
			driverAnotherDocumentStart: '',
			driverAnotherDocumentDepartment: '',
			driverPassportDepID: '',
			driverPassportDepartment: '',
			driverBirthLocation: '',
			driverAddress: '',
			driverAddressPostCode: '',
			nonChangedPassportApproval: false,
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
			driverRegistrationStart: '',
			driverLicenseDepartment: '',
			driverLicenseID: '',
			driverLicenseNumber: '',
			driverPrevLicenseStart: '',
			driverPrevLicenseID: '',
			driverPrevLicenseNumber: '',
			driverChildrenCount: '',
			driverOSAGOInsurant: false,
			driverOSAGOOwner: true,
			driverCitizenRF: true,
			sameAsRealAddress: true,
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

	driverInfoSave = (value) => {
		if ('calculationSave' in this.props) this.props.calculationSave(value)
	};

	onClientFlatTypeChange = value => {
		this.setState({clientFlatType: value})
	};

	onDriverLicensePrevChange = e => {
		this.setState({driverLicensePrev: e.target.checked})
	};
	
	onDriverLicenseFirstChange = e => {
		this.setState({driverLicenseFirst: e.target.value})
	};

	onDriverPrevLicenseIDChange = e => {
		this.setState({driverPrevLicenseID: e.target.value})
	};

	onDriverLicenseNumberPrevChange = e => {
		this.setState({driverPrevLicenseNumber: e.target.value})
	};

	onDriverPrevLicenseStartChange = e => {
		this.setState({driverPrevLicenseStart: e.target.value})
	};
	
	onClientLicenseStartChange = e => {
		this.setState({clientLicenseStart: e.target.value})
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

	onClientLicenseDepIDChange = e => {
		this.setState({clientLicenseDepID: e.target.value})
	};

	addActiveField = (field) => {
		setTimeout(() => {
			let fields = this.state.activeFields.slice(0)

			if (fields.indexOf(field) < 0) {
				fields.push(field)

				this.setState({activeFields: fields})
			}
		}, 100)
	};
	
	activeClass = (field) => {
		return (this.state.activeFields.indexOf(field) > -1 ? " control-focused" : "")
	};
	
	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		if (name in this.state) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
		} else {
			switch (name) {
				case 'carForTaxi':
					this.setState({carForTaxi: value})
					break

			}
		}
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
		let {fullCalculation, allFields, expanded, osago, wholeName} = this.props
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
		
		return (
			<div className="driver-info">
				{
					(expanded && drivers.length) ? drivers.map((d, di) => {
						return (
							<>
								{di ?
									<div key={di} className="driver-info__item">
										<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
											<Col span={3}/>
											<Col span={18}>
												<>
													{!d ?
														<div onClick={this.addDriver} className="driver-info__add gl_link">Добавить контактное лицо</div>
														:
														<div onClick={this.removeDriver} className="driver-info__remove gl_link">Удалить контактное лицо</div>
													}
												</>
											</Col>
										</Row>
									</div>
									:
									<div key={di} className="driver-info__item">
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<Col span={18}>
												<div className="driver-info__caption">Личная информация</div>
											</Col>
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
		
											{wholeName ?
												<FormInput span={12} onChangeCallback={this.formControlCallback}
																	 placeholder="Фамилия, Имя, Отчество" controlName={'clientWholeName'} value={''}/>
												:
												<>
													<FormInput span={6} onChangeCallback={this.formControlCallback}
																		 placeholder="Фамилия" controlName={'driverLastName'} value={''}/>
		
													<FormInput span={6} onChangeCallback={this.formControlCallback}
																		 placeholder="Имя" controlName={'driverFirstName'} value={''}/>
		
													<FormInput span={6} onChangeCallback={this.formControlCallback}
																		 placeholder="Отчество" controlName={'driverFarthersName'} value={''}/>
												</>
											}
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<FormInput span={6} onChangeCallback={this.formControlCallback}
																 placeholder="Дата рождения" controlName={'driverBirthday'} value={''}/>
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<FormSelect span={6} onChangeCallback={this.formControlCallback}
																	options={this.state.driverFamilyStatusList}
																	className={this.activeClass('driverFamilyStatus')}
																	placeholder="Семейное положение" controlName={'driverFamilyStatus'}
																	value={this.state.driverFamilyStatus}/>
											<FormInput span={6} onChangeCallback={this.formControlCallback}
																 placeholder="Кол-во детей младше 21"
																 controlName={'driverChildrenCount'} value={''}/>
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<FormCheckbox onChangeCallback={this.formControlCallback}
																		text="Страхователь"
																		className="checkbox_middle check_v3"
																		value={0}
																		controlName={'driverOSAGOInsurant'} checked={this.state.driverOSAGOInsurant}/>
											
											<FormCheckbox onChangeCallback={this.formControlCallback}
																		text="Собственник"
																		className="checkbox_middle check_v3"
																		value={1}
																		controlName={'driverOSAGOOwner'} checked={this.state.driverOSAGOOwner}/>
										</Row>
		
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<Col span={18}>
												<div className="driver-info__caption">Контакты</div>
											</Col>
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<FormInput span={6} onChangeCallback={this.formControlCallback}
																 placeholder="Мобильный телефон"
																 controlName={'driverPhone'} value={this.state.driverPhone}/>
									
											<FormInput span={12} onChangeCallback={this.formControlCallback}
																 placeholder="Емейл"
																 controlName={'driverEmail'} value={this.state.driverEmail}/>
										</Row>
										
										{
											fullCalculation ? 
												<>
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
														<Col span={12}>
															<div className="driver-info__caption">Паспорт</div>
														</Col>
														<FormCheckbox span={6} onChangeCallback={this.formControlCallback}
																					text="Гражданин РФ"
																					className="check_v3"
																					value={1}
																					controlName={'driverCitizenRF'} checked={this.state.driverCitizenRF}/>
													</Row>
													
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormInput span={6} onChangeCallback={this.formControlCallback}
																			 inputmask={clientLicenseIDMask}
																			 placeholder="Серия, номер"
																			 controlName={'driverPassport'} value={this.state.driverPassport}/>
																			 
														<FormInput span={6} onChangeCallback={this.formControlCallback}
																			 inputmask={clientLicenseIDMask}
																			 placeholder="Дата выдачи"
																			 controlName={'driverPassportStart'} value={this.state.driverPassportStart}/>
																			 
														{/*<Col span={6}>*/}
															{/*<DatePicker format={dateFormat}*/}
															{/*	value={this.state.clientLicenseStart ? moment(this.state.clientLicenseStart) : null}*/}
															{/*	onChange={this.onClientLicenseStartChange} placeholder=""*/}
															{/*	className={"w_100p wrapper-error hide_picker_icon" + (this.state.clientLicenseStart && this.state.clientLicenseStart._isAMomentObject ? "" : " _empty")}/>*/}
														{/*	<Input data-inputmask={dateFormatMask}*/}
														{/*		   className={"w_100p custom_placeholder " + (allFields ? "input-error" : "") + ((this.state.clientLicenseStart + '').length ? "" : " _empty")}*/}
														{/*		   value={this.state.clientLicenseStart}*/}
														{/*		   onChange={this.onClientLicenseStartChange} defaultValue=""/>*/}
														{/*	<div className="float_placeholder">Дата выдачи</div>*/}
														{/*</Col>*/}
														
														<FormInput span={6} onChangeCallback={this.formControlCallback}
																			 inputmask={clientLicenseNumberMask} 
																			 placeholder="Код подразделения"
																			 controlName={'driverPassportDepID'} value={this.state.driverPassportDepID}/>
																			 
													</Row>
		
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormInput span={18} onChangeCallback={this.formControlCallback}
																			 placeholder="Кем выдан"
																			 controlName={'driverPassportDepartment'} value={this.state.driverPassportDepartment}/>
													</Row>
		
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormInput span={12} onChangeCallback={this.formControlCallback}
																			 placeholder="Место рождения" controlName={'driverBirthLocation'}
																			 value={''}/>
		
														<FormCheckbox onChangeCallback={this.formControlCallback}
																					text="Ранее паспорт не менялся"
																					className="checkbox_middle check_v3"
																					value={1}
																					controlName={'nonChangedPassportApproval'} checked={true}/>
													</Row>
													
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
														<Col span={12}>
															<div className="driver-info__caption">Адрес регистрации</div>
														</Col>
													</Row>
													
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
														<FormInput span={6} onChangeCallback={this.formControlCallback}
																	 placeholder="Индекс" controlName={'driverAddressPostCode'}
																	 value={''}/>
													</Row>
													
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormInput span={18} onChangeCallback={this.formControlCallback}
																			 placeholder="Адрес" controlName={'driverAddress'}
																			 value={''}/>
																			 
														{/*<Col span={3}>*/}
														{/*	<Input*/}
														{/*		className={"w_100p custom_placeholder " + (allFields ? "input-error" : "") + ((this.state.clientFlat + '').length ? "" : " _empty")}*/}
														{/*		value={this.state.clientFlat}*/}
														{/*		onChange={this.onClientFlatChange} defaultValue=""/>*/}
														{/*	<div className="float_placeholder">Квартира</div>*/}
														{/*</Col>*/}
														{/*<Col span={3}>*/}
														{/*	<Input*/}
														{/*		className={"w_100p custom_placeholder " + (allFields ? "input-error" : "") + ((this.state.clientPostCode + '').length ? "" : " _empty")}*/}
														{/*		value={this.state.clientPostCode}*/}
														{/*		onChange={this.onClientPostCodeChange} defaultValue=""/>*/}
														{/*	<div className="float_placeholder">Индекс</div>*/}
														{/*</Col>*/}
													</Row>
													
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormInput span={6} onChangeCallback={this.formControlCallback}
																			 placeholder="Дата регистрации" controlName={'driverRegistrationStart'}
																			 value={''}/>
																			 
													</Row>
		
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
														<FormSelect span={6} onChangeCallback={this.formControlCallback}
																				options={this.state.clientFlatTypeList}
																				className={this.activeClass('clientFlatType')}
																				placeholder="Статус недвижимости" controlName={'clientFlatType'}
																				value={this.state.clientFlatType}/>
													</Row>
		
													<Row className="kasko-car-select__controls" gutter={20}>
														<Col span={3}/>
		
														<FormCheckbox onChangeCallback={this.formControlCallback}
																					text="Совпадает с адресом проживания"
																					value={1}
																					controlName={'sameAsRealAddress'} checked={this.state.sameAsRealAddress}/>
													</Row>
												</>
												: null
										}
		
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
											<Col span={18}>
												<div className="driver-info__caption">Второй документ</div>
											</Col>
										</Row>
		
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
		
											<FormInput span={6} onChangeCallback={this.formControlCallback}
																 inputmask={clientLicenseIDMask}
																 placeholder="Серия, номер"
																 controlName={'driverAnotherDocument'} value={this.state.driverAnotherDocument}/>
		
											<FormInput span={6} onChangeCallback={this.formControlCallback}
																 inputmask={clientLicenseIDMask}
																 placeholder="Дата выдачи"
																 controlName={'driverAnotherDocumentStart'} value={this.state.driverAnotherDocumentStart}/>
										</Row>
										
										<Row className="kasko-car-select__controls" gutter={20}>
											<Col span={3}/>
		
											<FormInput span={12} onChangeCallback={this.formControlCallback}
																 placeholder="Кем выдан"
																 controlName={'driverAnotherDocumentDepartment'} value={this.state.driverAnotherDocumentDepartment}/>
										</Row>
											
										{/*<div className="kasko-car-select__controls">*/}
										{/*	<Checkbox onChange={this.onDriverLicensePrevChange}>Предыдущее ВУ*/}
										{/*		<span className="checkbox_middle--hint">(Не обязательно)</span></Checkbox>*/}
										{/*</div>*/}
											
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
															 className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseID + '').length ? "" : " _empty")}
															 value={this.state.driverPrevLicenseID}
															 onChange={this.onDriverPrevLicenseIDChange} defaultValue=""/>
													<div className="float_placeholder">Серия</div>
												</Col>
												<Col span={3}>
													<Input data-inputmask={driverLicenseNumberMask}
															 className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseNumber + '').length ? "" : " _empty")}
															 value={this.state.driverPrevLicenseNumber}
															 onChange={this.onDriverLicenseNumberPrevChange}
															 defaultValue=""/>
													<div className="float_placeholder">Номер</div>
												</Col>
												<Col span={6}>
													<Input data-inputmask={dateFormatMask}
														className={"w_100p custom_placeholder " + ((this.state.driverPrevLicenseStart + '').length ? "" : " _empty")}
														value={this.state.driverPrevLicenseStart}
														onChange={this.onDriverPrevLicenseStartChange}
														defaultValue=""/>
													<div className="float_placeholder">Дата выдачи</div>
												</Col>
											</Row> : null
										}
								</div>
								}
							</>
						)
					}) : null
				}
				
				{/*<div className="kasko-car-select__controls ant-row-center">*/}
				{/*	<div className="driver-info__add gl_link">Добавить водителя</div>*/}
				{/*</div>*/}
				
				{/*<div className="kasko-car-select__controls ant-row-center">*/}
				{/*	<div className="kasko-car-select__controls--group">*/}
				{/*		<div className="kasko-car-select__controls--group-l">*/}
				{/*			<div onClick={() => this.driverInfoSave(false)} className={"gl_link"}>Отмена</div>*/}
				{/*		</div>*/}
				{/*		<div onClick={() => this.driverInfoSave(true)} className={"ant-btn ant-btn-primary btn_middle"}>Получить расчет</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				
			</div>
		);
	}
}

export default DriverInfo;
