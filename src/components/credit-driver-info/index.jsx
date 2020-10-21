import React, {Component} from "react";
import {Input, Col, Row, Checkbox, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import FormInput from "../form-input";
import Inputmask from "inputmask";
import FormCheckbox from "../form-checkbox";
import FormSelect from "../form-select";

//const {Option} = Select;

class CreditDriverInfo extends Component {
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
			clientBirthLocation: '',
			nameWasChanged: false,
			driverLicensePrev: false,
			driverProgenyNess: false,
			driverCitizenship: '',
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
			driverEncmbranceCount: '',
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
		popupCallback: PropTypes.func,
		innerWidth: PropTypes.number
	};
	
	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);
		
		switch (name) {
			case 'clientProgenyNess':
				this.onDriverProgenyNessChange(value)
				break
		}
		
	};
	
	onNameWasChangedChange = value => {
		this.setState({nameWasChanged: !this.state.nameWasChanged})
	};

	onDriverLicensePrevChange = e => {
		this.setState({driverLicensePrev: e.target.checked})
	};

	onDriverProgenyNessChange = checked => {
		this.setState({driverProgenyNess: checked})
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

	onDriverPhoneChange = e => {
		this.setState({driverPhone: e.target.value})
	};

	onDriverEmailChange = e => {
		this.setState({driverEmail: e.target.value})
	};
	
	onDriverPrevLicenseStartChange = e => {
		this.setState({driverPrevLicenseStart: e.target.value})
	};

	onDriverCitizenshipChange = e => {
		this.setState({driverCitizenship: e.target.value})
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
		let {allFields, expanded, familyInfo, professionalActivity, incomesExpenses, contactsFull, additioanalChecks} = this.props
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
					(expanded && drivers.length) ? drivers.map((d) => {
						return (<div key={d} className="driver-info__item">
							<div className="driver-info__caption">Личная информация</div>
								
							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input
										className={"w_100p custom_placeholder " + ((this.state.driverLastName + '').length ? "" : " _empty")}
										value={this.state.driverLastName}
										onChange={this.onDriverLastNameChange} defaultValue=""/>
									<div className="float_placeholder">Фамилия</div>
								</Col>
								<Col span={6}>
									<Input
										className={"w_100p custom_placeholder " + ((this.state.driverFirstName + '').length ? "" : " _empty")}
										value={this.state.driverFirstName}
										onChange={this.onDriverFirstNameChange} defaultValue=""/>
									<div className="float_placeholder">Имя</div>
								</Col>
								<Col span={6}>
									<Input
										className={"w_100p custom_placeholder " + ((this.state.driverFarthersName + '').length ? "" : " _empty")}
										value={this.state.driverFarthersName}
										onChange={this.onDriverFarthersNameChange} defaultValue=""/>
									<div className="float_placeholder">Отчество</div>
								</Col>
								<Col span={6}>
									<Input data-inputmask={dateFormatMask}
										   className={"w_100p custom_placeholder " + ((this.state.driverBirthday + '').length ? "" : " _empty")}
										   value={this.state.driverBirthday}
										   onChange={this.onDriverBirthdayChange} defaultValue=""/>
									<div className="float_placeholder">Дата рождения</div>
								</Col>
							</Row>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col>
									<Checkbox onChange={this.onNameWasChangedChange}>Ранее ФИО было изменено</Checkbox>
								</Col>
							</Row>

							<Radio.Group className={"w_100p "} defaultValue={0}>
								<Row className="kasko-car-select__controls" gutter={20}>
									<Col span={3}>
										<Radio value={0}>Мужской</Radio>
									</Col>
									<Col span={3}>
										<Radio value={1}>Женский</Radio>
									</Col>
									<Col span={6}>
										<Input
											className={"w_100p custom_placeholder " + ((this.state.driverCitizenship + '').length ? "" : " _empty")}
											value={this.state.driverCitizenship}
											onChange={this.onDriverCitizenshipChange} defaultValue=""/>
										<div className="float_placeholder">Гражданство</div>
									</Col>
								</Row>
							</Radio.Group>

							<Row className="kasko-car-select__controls" gutter={20}>
								<FormInput span={24} onChangeCallback={this.formControlCallback}
										   className={allFields ? "input-error" : ""}
										   placeholder="Место рождения" controlName={'clientBirthLocation'} value={''}/>
							</Row>

							{familyInfo ?
								<>
									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={6} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Семейное положение" controlName={'clientFamilyStatus'}
													value={this.state.driverFamilyStatus}/>
	
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Есть дети"
													  className="checkbox_middle check_v3"
													  value={1} span={6}
													  controlName={'clientProgenyNess'} checked={false}/>
	
										{this.state.driverProgenyNess ?
											<>
												<FormInput span={6} onChangeCallback={this.formControlCallback}
														   placeholder="Кол-во детей младше 21"
														   controlName={'clientChildrenCount'} value={''}/>
	
												<FormInput span={6} onChangeCallback={this.formControlCallback}
														   placeholder="Кол-во иждивенцев"
														   controlName={'clientEncmbranceCount'} value={''}/>
											</>
											: null
										}
									</Row>

									<div className="driver-info__caption">Данные о супруге</div>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Фамилия" controlName={'spouseLastName'} value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Имя" controlName={'spouseFirstName'} value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Отчество" controlName={'spouseFarthersName'}
												   value={''}/>

									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Ранее ФИО было изменено"
													  value={1}
													  controlName={'spouseNameWasChanged'} checked={false}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Кол-во лет в браке" controlName={'marriageDuration'}
												   value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   inputmask={dateFormatMask}
												   placeholder="Дата рождения" controlName={'spouseBirthDay'}
												   value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={24} onChangeCallback={this.formControlCallback}
												   className={allFields ? "input-error" : ""}
												   placeholder="Место рождения" controlName={'spouseBirthLocation'}
												   value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={12} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Социальный статус" controlName={'spouseSocialStatus'}
													value={this.state.driverFamilyStatus}/>
									</Row>
								</>
								: null
							}

							{professionalActivity ? 
								<>
									<div className="driver-info__caption">Профессиональная деятельность клиента</div>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={12} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Социальный статус" controlName={'clientSocialStatus'}
													value={this.state.driverFamilyStatus}/>

										<FormSelect span={12} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Образование" controlName={'clientEducation'}
													value={this.state.driverFamilyStatus}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={6} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Тип организации" controlName={'clientOrganizationType'}
													value={this.state.driverFamilyStatus}/>

										<FormInput span={18} onChangeCallback={this.formControlCallback}
												   placeholder="Юридическое название места работы"
												   controlName={'clientOrganizationLocation'} value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={18} onChangeCallback={this.formControlCallback}
												   placeholder="Юридический адрес работодателя "
												   controlName={'clientOrganizationLocation'} value={''}/>

										<FormInput span={3} onChangeCallback={this.formControlCallback}
												   placeholder="Офис" controlName={'clientOrganizationOffice'}
												   value={''}/>

										{/*<FormInput span={3} onChangeCallback={this.formControlCallback}*/}
										{/*		   placeholder="Индекс" controlName={'clientOrganizationPostCode'}*/}
										{/*		   value={''}/>*/}
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Совпадает с фактическим адресом"
													  value={1}
													  controlName={'equalsRealAddress'} checked={false}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="ИНН организации"
												   controlName={'clientOrganizationINN'} value={''}/>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Рабочий телефон"
												   inputmask={driverPhoneMask}
												   controlName={'clientOrganizationPhone'} value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={12} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Тип должности" controlName={'clientPostType'}
													value={this.state.driverFamilyStatus}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={12} onChangeCallback={this.formControlCallback}
												   placeholder="Название должности"
												   controlName={'clientPostName'} value={''}/>
										<FormSelect span={6} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Стаж на данном месте" controlName={'clientPostPeriod'}
													value={this.state.driverFamilyStatus}/>
									</Row>
								</>
								: null
							}

							{incomesExpenses ?
								<>
									<div className="driver-info__caption">Ежемесячные доходы/расходы</div>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder={"Доход по основному месту \n работы"}
												   controlName={'clientMainIncome'}
												   value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder={"Дополнительный доход"}
												   controlName={'clientAdditionalIncome'}
												   value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder={"Доход супруги/ супруга"} controlName={'spouselIncome'}
												   value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder={"Общие расходы"} controlName={'clientGeneralExpenses'}
												   value={''}/>

										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder={"Расходы на кредиты"}
												   controlName={'clientCreditExpenses'}
												   value={''}/>
									</Row>
								</>
								: null
							}

							<div className="driver-info__caption">Паспорт</div>

							<Row className="kasko-car-select__controls" gutter={20}>
								<FormInput span={3} onChangeCallback={this.formControlCallback}
										   placeholder={"Серия"}
										   controlName={'clientPassportSeries'}
										   value={''}/>

								<FormInput span={3} onChangeCallback={this.formControlCallback}
										   placeholder={"Номер"} controlName={'clientPassportNumber'}
										   value={''}/>

								<FormInput span={6} onChangeCallback={this.formControlCallback}
										   placeholder={"Дата выдачи"}
										   controlName={'clientPassportDateStart'}
										   value={''}/>
										   
								<FormInput span={6} onChangeCallback={this.formControlCallback}
										   placeholder={"Код подразделения"}
										   controlName={'clientPassportDepartmentCode'}
										   value={''}/>
							</Row>
							
							<Row className="kasko-car-select__controls" gutter={20}>
								<FormInput span={24} onChangeCallback={this.formControlCallback}
										   placeholder={"Кем выдан"}
										   controlName={'clientPassportDepartment'}
										   value={''}/>
							</Row>

							{additioanalChecks ?
								<Row className="kasko-car-select__controls" gutter={20}>
									<FormCheckbox onChangeCallback={this.formControlCallback}
												  text="Подтверждаю, что ранее паспорт не менялся"
												  value={1}
												  controlName={'nonChangedPassportApproval'} checked={true}/>
								</Row>
								: null
							}

							<div className="driver-info__caption">Адрес регистрации</div>

							<Row className="kasko-car-select__controls" gutter={20}>
								<FormInput span={18} onChangeCallback={this.formControlCallback}
										   placeholder={"Адрес"}
										   controlName={'clientAddress'}
										   value={''}/>

								{/*<FormInput span={3} onChangeCallback={this.formControlCallback}*/}
								{/*		   placeholder="Квартира" controlName={'clientAddressFlat'} value={''}/>*/}

								{/*<FormInput span={3} onChangeCallback={this.formControlCallback}*/}
								{/*		   placeholder="Индекс" controlName={'clientAddressPostCode'}*/}
								{/*		   value={''}/>*/}
							</Row>
							
							<Row className="kasko-car-select__controls" gutter={20}>
								<FormInput span={6} onChangeCallback={this.formControlCallback}
										   placeholder={"Дата регистрации"}
										   controlName={'clientAddressRegDate'}
										   value={''}/>

								<FormSelect span={12} onChangeCallback={this.formControlCallback}
											options={this.state.driverFamilyStatusList}
											placeholder="Тип жилья" controlName={'clientHouseType'}
											value={this.state.driverFamilyStatus}/>
							</Row>

							{additioanalChecks ?
								<Row className="kasko-car-select__controls" gutter={20}>
									<FormCheckbox onChangeCallback={this.formControlCallback}
												  text="Совпадает с адресом проживания"
												  value={1}
												  controlName={'sameAsRealAddress'} checked={true}/>
								</Row>
								: null
							}

							<div className="driver-info__caption">Водительское удостоверение</div>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={3}>
									<Input data-inputmask={driverLicenseIDMask}
										   className={"w_100p custom_placeholder " + ((this.state.driverLicenseID + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseID}
										   onChange={this.onDriverLicenseIDChange} defaultValue=""/>
									<div className="float_placeholder">Серия</div>
								</Col>
								<Col span={3}>
									<Input data-inputmask={driverLicenseNumberMask}
										   className={"w_100p custom_placeholder " + ((this.state.driverLicenseNumber + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseNumber}
										   onChange={this.onDriverLicenseNumberChange} defaultValue=""/>
									<div className="float_placeholder">Номер</div>
								</Col>
								<Col span={6}>
									<Input data-inputmask={dateFormatMask}
										   className={"w_100p custom_placeholder " + ((this.state.driverLicenseStart + '').length ? "" : " _empty")}
										   value={this.state.driverLicenseStart}
										   onChange={this.onDriverLicenseStartChange} defaultValue=""/>
									<div className="float_placeholder">Дата выдачи</div>
								</Col>
								<Col span={6}>
									<Input data-inputmask={dateFormatMask}
										   className={"w_100p custom_placeholder " + ((this.state.driverExperienceStart + '').length ? "" : " _empty")}
										   value={this.state.driverExperienceStart}
										   onChange={this.onDriverExperienceStartChange} defaultValue=""/>
									<div className="float_placeholder">Дата начала стажа</div>
								</Col>
							</Row>

							<div className="kasko-car-select__controls">
								<Checkbox onChange={this.onDriverLicensePrevChange}>Предыдущее ВУ <span className="checkbox_middle--hint">(Не обязательно)</span></Checkbox>
							</div>

							{this.state.driverLicensePrev ?
								<Row className="kasko-car-select__controls" gutter={20}>
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

							<div style={{marginTop: '80px'}} className="driver-info__caption">Контакты</div>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input disabled="disabled"
										   className={"w_100p custom_placeholder _empty"}
										   defaultValue=""/>
									<div className="float_placeholder">Фамилия И. Клиента</div>
								</Col>
								<Col span={6}>
									<Input data-inputmask={driverPhoneMask}
										   className={"w_100p custom_placeholder" + ((this.state.driverPhone + '').length ? "" : " _empty")}
										   value={this.state.driverPhone}
										   onChange={this.onDriverPhoneChange} defaultValue=""/>
									<div className="float_placeholder">Мобильный телефон</div>
								</Col>
								<Col span={12}>
									<Input data-inputmask={driverEmailMask}
										   className={"w_100p custom_placeholder" + ((this.state.driverEmail + '').length ? "" : " _empty")}
										   value={this.state.driverEmail}
										   onChange={this.onDriverEmailChange} defaultValue=""/>
									<div className="float_placeholder">Емейл</div>
								</Col>
							</Row>
							
							{contactsFull ? 
								<>
									<Row className="kasko-car-select__controls" gutter={20}>
										<FormSelect span={6} onChangeCallback={this.formControlCallback}
													options={this.state.driverFamilyStatusList}
													placeholder="Второй контакт" controlName={'clientSecondContact'}
													value={this.state.driverFamilyStatus}/>
										<FormInput span={6} onChangeCallback={this.formControlCallback}
												   placeholder="Мобильный телефон"
												   inputmask={driverPhoneMask}
												   controlName={'clientSecondPhone'} value={''}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Согласие на запрос из БКИ"
													  value={1}
													  controlName={'BKIAgreement'} checked={true}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Согласие на обработку ПД"
													  value={1}
													  controlName={'DataPrecessingAgreement'} checked={true}/>
									</Row>

									<Row className="kasko-car-select__controls" gutter={20}>
										<FormCheckbox onChangeCallback={this.formControlCallback}
													  text="Согласие на электронное подписание документов"
													  value={1}
													  controlName={'eSignAgreement'} checked={true}/>
									</Row>
								</>
							 : null
							}
						</div>)
					}) : null
				}
			</div>
		);
	}
}

export default CreditDriverInfo;
