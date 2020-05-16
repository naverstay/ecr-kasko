import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, DatePicker, Checkbox, Form, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";

const {Option} = Select;
const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class KaskoCarSelectNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			allowPayment: false,
			showAdditional: false,
			formBusy: false,
			carForTaxi: false,
			carAutoStart: false,
			newCar: true,
			carCredit: true,
			carPrice: 0,
			carPower: 0,
			carPowerRange: '',
			carMileage: 0,
			carRegion: '',
			carMark: '',
			carVIN: '',
			carPTS: '',
			carPTSStart: '',
			carModel: '',
			carMotorSize: '',
			carBodyType: '',
			carMotorType: '',
			carEquipment: '',
			carKaskoDoc: '',
			carKaskoDocStart: '',
			carATS: '',
			carBankName: '',
			carTransmissionType: '',
			carNumber: '',
			carYear: '',
			carUsageStart: '',
			markList: [
				"BMW",
				"Honda",
				"Lotus",
				"Mercedes-Benz"
			],
			modelList: [
				"M3",
				"Accord",
				"100500",
				"GT S Sports Car"
			],
			equipmentList: [
				"Comfort",
				"Sport",
				"Executive",
				"GT S Sports Car"
			],
			carBankNameList: [
				"Банк 1",
				"Банк 2"
			],
			carATSList: [
				"Sheriff",
				"Mangoose",
				"Noname"
			],
			carPowerList: [
				"100 л.с.",
				"200 л.с.",
				"300 л.с."
			],
			carTransmissionTypeList: [
				"МКПП",
				"АКПП"
			],
			carMotorSizeList: [
				"1 л.",
				"2 л.",
				"3 л."
			],
			carBodyTypeList: [
				"Седан",
				"Универсал",
				"Ландо",
				"Купе"
			],
			carMotorTypeList: [
				"Бензин",
				"Дизель",
				"Эко",
				"Гибрид"
			]
		};
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		step: PropTypes.number
	};

	formRef = React.createRef();
	
	checkReadyState = () => {
		setTimeout(() => {
			if (this.state.newCar) {
				let allFieldsReady = true
				let checkFields = [
					'carATS',
					'carMark',
					'carModel',
					'carEquipment',
					'carRegion',
					'carPrice',
					'carPower',
					'carYear',
					'carUsageStart'
				]

				for (let i = 0; i < checkFields.length; i++) {
					const field = checkFields[i];

					if (!this.state[field]) {
						allFieldsReady = false
						break;
					}
				}

				this.setState({carFound: allFieldsReady, allowPayment: allFieldsReady})
			}
		}, 0)
	};
	
	onCarYearChange = e => {
		this.setState({carYear: e})
		this.checkReadyState()
	};

	onCarUsageStartChange = e => {
		this.setState({carUsageStart: e.target.value})
		this.checkReadyState()
	};

	toggleAdditionalFields = e => {
		this.setState({showAdditional: !this.state.showAdditional})
	};

	onCarNumberChange = e => {
		this.setState({carNumber: e.target.value, carFound: void 0})
		this.checkReadyState()
	};

	onMarkChange = value => {
		this.setState({carMark: value})
		this.checkReadyState()
	};

	onCarPowerRangeChange = value => {
		this.setState({carPowerRange: value})
		this.checkReadyState()
	};

	onModelChange = value => {
		this.setState({carModel: value})
		this.checkReadyState()
	};

	onCarPowerChange = e => {
		this.setState({carPower: e.target.value})
		this.checkReadyState()
	};

	onСarMileageChange = e => {
		this.setState({carMileage: e.target.value})
		this.checkReadyState()
	};
	
	onCarPriceChange = e => {
		this.setState({carPrice: e.target.value})
		this.checkReadyState()
	};

	onCarKaskoDocChange = e => {
		this.setState({carKaskoDoc: e.target.value})
	};

	onCarKaskoDocStartChange = e => {
		this.setState({carKaskoDocStart: e.target.value})
	};

	onCarRegionChange = e => {
		this.setState({carRegion: e.target.value})
		this.checkReadyState()
	};

	onEquipmentChange = value => {
		this.setState({carEquipment: value})
		this.checkReadyState()
	};

	onCarBodyTypeChange = value => {
		this.setState({carBodyType: value})
		this.checkReadyState()
	};

	onCarMotorTypeChange = value => {
		this.setState({carMotorType: value})
		this.checkReadyState()
	};

	onCarTransmissionTypeChange = value => {
		this.setState({carTransmissionType: value})
		this.checkReadyState()
	};

	onCarMotorSizeChange = value => {
		this.setState({carMotorSize: value})
		this.checkReadyState()
	};

	onCarATSChange = value => {
		this.setState({carATS: value})
		this.checkReadyState()
	};

	onCarBankNameChange = value => {
		this.setState({carBankName: value})
		this.checkReadyState()
	};

	onCarForTaxiChange = e => {
		this.setState({carForTaxi: e.target.checked})
	};

	onAutoStartChange = e => {
		this.setState({carAutoStart: e.target.checked})
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

	onFinish = values => {
		this.setState({formBusy: true})
		
		setTimeout(() => {
			this.setState({formBusy: false, carFound: true})
			
			if (this.state.carFound) {
				this.setState({
					allowPayment: true,
					carATS: 'Noname',
					carMark: 'Mercedes-Benz',
					carModel: 'GT S Sports Car',
					carEquipment: 'GT S Sports Car',
					carNumber: 'A 123 AA 177',
					carRegion: 'г. Москва',
					carPrice: 14800000,
					carPower: 245,
					carMileage: 24500,
					carYear: moment('2015'),
					carUsageStart: moment('2018-01-15')
				})
			}
		}, 200)
	};

	onReset = () => {
		this.formRef.current.resetFields();
	};

	onFill = () => {
		this.formRef.current.setFieldsValue({
			note: 'Hello world!',
			gender: 'male'
		});
	};

	onCarNewChange = e => {
		this.setState({
			newCar: !!e.target.value,
			carNumber: ''
		});
	};

	onCarCreditChange = e => {
		this.setState({
			carCredit: !!e.target.value
		});
	};
	
	componentDidMount() {
		this.props.allFields && this.setState({showAdditional: true})
	}

	componentDidUpdate() {
		document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
			let mask = {}
			inp.dataset.inputmask.split(',').forEach((m) => {
				let key = m.split(':')[0]
				mask[key] = m.split(':')[1]
			})
			Inputmask(mask).mask(inp);
		})
		
		document.querySelectorAll('[data-inputmask-date]').forEach(function (inp) {
			Inputmask({
				placeholder : '_',
				showMaskOnHover : false,
				regex: String.raw`^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
			}).mask(inp);
		})
	};

	render() {
		const {image, allFields, step, hideOffers, fullCalculation} = this.props;
		//const dateFormat = "DD.MM.YY"
		let dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
		
		//dateFormatMask = "'regex': '" + String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$` + "', 'showMaskOnHover': 'false'"
		
		//let rx = String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

		console.log('allFields', allFields, fullCalculation);

		const carNumberMask = "'mask': 'A 999 AA 999'"
		const carVINMask = "'alias': 'vin', 'placeholder': '', 'clearIncomplete': 'false'"

		const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		let searchDisabled = !this.state.carNumber.length || this.state.carNumber.indexOf('_') > -1 || this.state.formBusy
		
		function disabledDate(current) {
			return current && current._isAMomentObject && current.isAfter(new Date());
		}
		
		const layout = {
			labelCol: {
				span: 8
			},
			wrapperCol: {
				span: 16
			}
		};

		return (
			<div className="kasko-car-select">
				<div className="kasko-car-select__controls radio_v2">
					<Radio.Group defaultValue={this.state.newCar ? 1 : 0} onChange={this.onCarNewChange}>
						<Row gutter={20}>
							<Col>
								<Radio value={1}>Новый</Radio>
							</Col>
							<Col>
								<Radio value={0}>С пробегом</Radio>
							</Col>
						</Row>
					</Radio.Group>
				</div>

				{this.state.newCar ? "" :
					<Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={6}>
								<Input
									data-inputmask={carNumberMask}
									className={"ant-input w_100p text_upper" + (this.state.carNumber.length ? "" : " _empty")}
									   value={this.state.carNumber}
									   onChange={this.onCarNumberChange} defaultValue=""/>
								<div className="float_placeholder">Госномер автомобиля</div>
							</Col>
							<Col span={6}>
								<Button htmlType={searchDisabled ? null : "submit"} className={"w_100p " + (this.state.carFound !== void 0 ? "btn_grey" :
									this.state.formBusy ? "btn_grey" : "btn_green")} 
										disabled={searchDisabled ? 'disabled' : null}>
											{this.state.carFound === void 0 ? 
												this.state.formBusy ? 
												<span className={"btn_search"}>Поиск</span> :
												<span className={"btn_text"}>Найти данные ТС</span>
												: this.state.carFound ?
													<span className={"btn_text color_green"}>Данные найдены</span> :
													<span className={"btn_text color_red"}>Данные не найдены</span>
											}
								</Button>
							</Col>
						</Row>
					</Form>
				}

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Select
							dropdownClassName="select_dropdown_v1" className={"w_100p" + (this.state.carMark.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onMarkChange}
							value={this.state.carMark}
						>
							{this.state.markList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Марка</div>
					</Col>
					<Col span={6}>
						<Select
							dropdownClassName="select_dropdown_v1" className={"w_100p" + (this.state.carModel.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onModelChange}
							value={this.state.carModel}
						>
							{this.state.modelList.map( (e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Модель</div>
					</Col>
					<Col span={6}>
						<Select
							dropdownClassName="select_dropdown_v1" className={"w_100p" + (this.state.carEquipment.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onEquipmentChange}
							value={this.state.carEquipment}
						>
							{this.state.equipmentList.map( (e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Комплектация</div>
					</Col>
					<Col span={6}>
						<YearPicker format="YYYY" disabledDate={disabledDate} value={this.state.carYear ? moment(this.state.carYear) : null} onChange={this.onCarYearChange} placeholder="" className={"w_100p hide_picker_icon" + (this.state.carYear && this.state.carYear._isAMomentObject ? "" : " _empty")}/>
						<div className="float_placeholder">Год выпуска</div>
					</Col>
				</Row>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Input className={"w_100p" + (this.state.carRegion.length ? "" : " _empty")}
							   value={this.state.carRegion}
							   onChange={this.onCarRegionChange} defaultValue=""/>
						<div className="float_placeholder">Регион эксплуатации</div>
					</Col>
					<Col span={6}>
						{/*<DatePicker format={dateFormat} value={this.state.carUsageStart ? moment(this.state.carUsageStart) : null}*/}
						{/*			onChange={this.onCarUsageStartChange} placeholder=""*/}
						{/*			className={"w_100p hide_picker_icon" + (this.state.carUsageStart && this.state.carUsageStart._isAMomentObject ? "" : " _empty")}/>*/}
						<Input data-inputmask={dateFormatMask}
							   className={"w_100p" + (this.state.carUsageStart.length ? "" : " _empty")}
							   value={this.state.carUsageStart}
							   onChange={this.onCarUsageStartChange} defaultValue=""/>
						<div className="float_placeholder">{'Дата начала \n эксплуатации'}</div>
					</Col>
					<Col span={6}>
						<Select
							dropdownClassName="select_dropdown_v1"
							className={"w_100p" + (this.state.carPowerRange.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onCarPowerRangeChange}
							value={this.state.carPowerRange}
						>
							{this.state.carPowerList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Мощность двигателя</div>
					</Col>
				</Row>

				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}>
						<Input data-inputmask={carPowerMask} 
							   className={"w_100p" + ((this.state.carMileage + '').length ? "" : " _empty")}
							   value={this.state.carMileage}
							   onChange={this.onСarMileageChange}
							   defaultValue=""/>
						<div className="float_placeholder">Пробег, км</div>
					</Col>
					<Col span={6}>
						<Input
							data-inputmask={carPriceMask}
							className={"ant-input w_100p" + ((this.state.carPrice + '').length ? "" : " _empty")}
							value={this.state.carPrice}
							onChange={this.onCarPriceChange} defaultValue=""/>
						<div className="float_placeholder">Стоимость, ₽</div>
					</Col>
					<Col className="checkbox_middle check_v3">
						<Row gutter={20}>
							<Col>
								<Checkbox checked={this.state.carForTaxi ? "checked" : null}
										  onChange={this.onCarForTaxiChange}>Такси</Checkbox>
							</Col>

							{
								fullCalculation ?
									<Col>
										<Checkbox className={allFields ? "wrapper-error" : ""} checked={this.state.carAutoStart ? "checked" : null}
												  onChange={this.onAutoStartChange}>Автозапуск</Checkbox>
									</Col>
									: ""
							}
						</Row>
					</Col>
				</Row>
				
				{
					fullCalculation ?
						<>
							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1"
										className={"w_100p" + (this.state.carMotorType.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onCarMotorTypeChange}
										value={this.state.carMotorType}
									>
										{this.state.carMotorTypeList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Тип двигателя</div>
								</Col>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1"
										className={"w_100p" + (this.state.carBodyType.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onCarBodyTypeChange}
										value={this.state.carBodyType}
									>
										{this.state.carBodyTypeList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Тип кузова</div>
								</Col>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1"
										className={"w_100p" + (this.state.carTransmissionType.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onCarTransmissionTypeChange}
										value={this.state.carTransmissionType}
									>
										{this.state.carTransmissionTypeList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Тип КПП</div>
								</Col>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1"
										className={"w_100p" + (this.state.carMotorSize.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onCarMotorSizeChange}
										value={this.state.carMotorSize}
									>
										{this.state.carMotorSizeList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Объем двигателя</div>
								</Col>
							</Row>
							
							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input
										data-inputmask={carVINMask}
										className={"w_100p " + (allFields ? " input-error" : "") + ((this.state.carVIN + '').length ? "" : " _empty")}
										value={this.state.carVIN}
										onChange={this.onCarVINChange} defaultValue=""/>
									<div className="float_placeholder">VIN</div>
								</Col>
								<Col span={6}>
									<Input
										className={"w_100p " + (allFields ? " input-error" : "") + ((this.state.carPTS + '').length ? "" : " _empty")}
										value={this.state.carPTS}
										onChange={this.onCarPTSChange} defaultValue=""/>
									<div className="float_placeholder">ПТС</div>
								</Col>
								<Col span={6}>
									<Input
										data-inputmask={dateFormatMask}
										className={"w_100p " + (allFields ? " input-error" : "") + ((this.state.carPTSStart + '').length ? "" : " _empty")}
										value={this.state.carPTSStart}
										onChange={this.onCarPTSStartChange} defaultValue=""/>
									<div className="float_placeholder">Дата выдачи ПТС</div>
								</Col>
								<Col span={6}>
									<Select 
										dropdownClassName="select_dropdown_v1"
										className={"w_100p " + (allFields ? "wrapper-error" : "") + (this.state.carATS.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onCarATSChange}
										value={this.state.carATS}
									>
										{this.state.carATSList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Противоугонная система</div>
								</Col>
							</Row>
						</>
						: ""
				}

				<Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2 mb_60" gutter={20}>
					<Col span={6}>
						<Radio.Group className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")} onChange={this.onCarCreditChange}>
							<Row gutter={20}>
								<Col>
									<Radio disabled={this.state.allowPayment ? null : "disabled"} checked={this.state.carCredit ? "checked" : ""} value={1}>В кредит</Radio>
								</Col>
								<Col>
									<Radio disabled={this.state.allowPayment ? null : "disabled"} checked={!this.state.carCredit ? "checked" : ""} value={0}>За наличные</Radio>
								</Col>
							</Row>
						</Radio.Group>
					</Col>
					<Col span={6} className="align_self_start">
						<Select
							dropdownClassName="select_dropdown_v1"
							className={"w_100p" + (this.state.carBankName.length ? "" : " _empty")}
							placeholder=""
							onChange={this.onCarBankNameChange}
							value={this.state.carBankName}
						>
							{this.state.carBankNameList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
						</Select>
						<div className="float_placeholder">Банк</div>
					</Col>
				</Row>

				<Row className="kasko-car-select__controls mb_60" gutter={20}>
					<Col span={6}>
						<Input className={"w_100p" + ((this.state.carKaskoDoc + '').length ? "" : " _empty")}
							   value={(this.state.carKaskoDoc)}
							   onChange={this.onCarKaskoDocChange}
							   defaultValue=""/>
						<div className="float_placeholder">{'Номер действующего \n полиса КАСКО'}</div>
					</Col>
					<Col span={6}>
						<Input
							data-inputmask={dateFormatMask}
							className={"ant-input w_100p" + ((this.state.carKaskoDocStart + '').length ? "" : " _empty")}
							value={this.state.carKaskoDocStart}
							onChange={this.onCarKaskoDocStartChange} defaultValue=""/>
						<div className="float_placeholder">{'Дата начала действия \n нового полиса КАСКО'}</div>
					</Col>
				</Row>
				
				{/*{*/}
				{/*	allFields ?*/}
				{/*	""*/}
				{/*	: */}
				{/*	<div className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive" : "")}>*/}
				{/*		<img src={image || 'car-1-s.png'} alt=""/>*/}
				{/*	</div>*/}
				{/*}*/}

				{(!this.state.formBusy && this.state.carFound && !hideOffers) ?
					<KaskoOffers offersList={[
						{
							name: 'Кредит',
							price: 10400,
							prefix: 'от',
							suffix: '₽/мес'
						},
						{
							name: 'ОСАГО',
							price: 10410,
							prefix: 'от',
							suffix: '₽'
						},
						{
							name: 'КАСКО',
							price: 10420,
							prefix: 'от',
							suffix: '₽'
						},
						{
							name: 'GAP',
							price: 10430,
							prefix: 'от',
							suffix: '₽'
						}
					]} />
				: "" }
				
			</div>
		);
	}
}

export default KaskoCarSelectNew;
