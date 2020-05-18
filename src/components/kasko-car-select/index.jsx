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

class KaskoCarSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			allowPayment: false,
			showAdditional: false,
			formBusy: false,
			carAutoStart: false,
			newCar: true,
			carCredit: true,
			carPrice: 0,
			carPower: 0,
			carMileage: 0,
			carRegion: '',
			carMark: '',
			carModel: '',
			carEquipment: '',
			carATS: '',
			carNumber: '',
			carYear: '',
			carUsageStart: '',
			markList: [
				"Hyundai",
				"Mazda",
				//"Mercedes-Benz"
			],
			modelList: [
				"Sonata",
				"Solaris",
				"CX-5",
				"CX-9"
			],
			equipmentList: [
				"2.0 MPI - 6AT",
				"Comfort",
				"Sport",
				"Executive",
				"GT S Sports Car"
			],
			carATSList: [
				"Sheriff",
				"Mangoose",
				"Noname"
			]
		};
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		imageCallback: PropTypes.func,
		step: PropTypes.number
	};

	formRef = React.createRef();
	
	checkReadyState = () => {
		setTimeout(() => {
			if (this.state.newCar) {
				let allFieldsReady = true
				let checkFields = [
					//'carATS',
					'carMark',
					'carModel',
					'carEquipment',
					//'carRegion',
					//'carPrice',
					//'carPower',
					'carYear',
					//'carUsageStart'
				]

				for (let i = 0; i < checkFields.length; i++) {
					const field = checkFields[i];

					if (!this.state[field]) {
						allFieldsReady = false
						break;
					}
				}

				this.setState({carFound: allFieldsReady, allowPayment: allFieldsReady, carPrice: (allFieldsReady ? 1000000 : 0)})

				setTimeout(() => {
					if (allFieldsReady) this.updateImage(this.state.carMark)
				}, 0)
			}
		}, 0)
	};
	
	onCarYearChange = e => {
		this.setState({carYear: e})
		this.checkReadyState()
	};

	onCarUsageChange = e => {
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
		this.updateImage(value)
	};

	onModelChange = value => {
		this.setState({carModel: value})
		this.checkReadyState()
	};

	onCarPowerChange = e => {
		this.setState({carPower: e.target.value})
		this.checkReadyState()
	};
	
	onCarPriceChange = e => {
		this.setState({carPrice: e.target.value})
		this.checkReadyState()
	};

	onCarRegionChange = e => {
		this.setState({carRegion: e.target.value})
		this.checkReadyState()
	};

	onEquipmentChange = value => {
		this.setState({carEquipment: value})
		this.checkReadyState()
	};

	onATSChange = value => {
		this.setState({carATS: value})
		this.checkReadyState()
	};

	onAutoStartChange = e => {
		this.setState({carAutoStart: e.target.checked})
	};

	onFinish = values => {
		this.setState({formBusy: true})
		
		setTimeout(() => {
			this.setState({formBusy: false, carFound: true})
			
			if (this.state.carFound) {
				this.setState({
					allowPayment: true,
					carATS: 'Noname',
					carMark: 'Hyundai',
					carModel: 'Sonata',
					carEquipment: '2.0 MPI - 6AT',
					carNumber: 'A 123 AA 177',
					carRegion: 'г. Москва',
					carPrice: 14800000,
					carPower: 245,
					carMileage: 24500,
					carYear: moment('2015'),
					carUsageStart: '18.05.2020'
				})
				this.updateImage(this.state.carMark)
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
		this.props.allFields && this.setState({showAdditional: true, newCar: false})
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

	updateImage = (img) => {
		if ('imageCallback' in this.props && this.state.carFound) this.props.imageCallback(img)
	};
	
	render() {
		const {allFields, step, hideOffers} = this.props;
		let {image} = this.props;
		//const dateFormat = "DD.MM.YY"
		let dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
		
		//dateFormatMask = "'regex': '" + String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$` + "', 'showMaskOnHover': 'false'"
		
		//let rx = String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

		//console.log('dateFormatMask', dateFormatMask, rx);

		const carNumberMask = "'mask': 'A 999 AA 999'"
		const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		let searchDisabled = !this.state.carNumber.length || this.state.carNumber.indexOf('_') > -1 || this.state.formBusy
				
		if (this.state.carMark) {
			image = this.state.carMark
		}
		
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

				{this.state.newCar ? null :
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
									this.state.formBusy ? "btn_grey" : "ant-btn-primary")} 
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

				{
					this.state.showAdditional ?
						<>
							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input
										data-inputmask={carPriceMask}
										className={"ant-input w_100p" + ((this.state.carPrice + '').length ? "" : " _empty")} 
										 value={this.state.carPrice}
										 onChange={this.onCarPriceChange} defaultValue=""/>
									<div className="float_placeholder">Стоимость, ₽</div>
								</Col>
								<Col span={6}>
									<Input disabled className={"w_100p" + ((this.state.carMileage + '').length ? "" : " _empty")}
										   value={formatMoney(this.state.carMileage)}
										   defaultValue=""/>
									<div className="float_placeholder">Пробег, км</div>
								</Col>
								<Col span={6}>
									<Input className={"w_100p" + (this.state.carRegion.length ? "" : " _empty")}
										   value={this.state.carRegion}
										   onChange={this.onCarRegionChange} defaultValue=""/>
									<div className="float_placeholder">Регион эксплуатации</div>
								</Col>
								<Col span={6}>
									{/*<DatePicker format={dateFormat} value={this.state.carUsageStart ? moment(this.state.carUsageStart) : null}*/}
									{/*			onChange={this.onCarUsageChange} placeholder=""*/}
									{/*			className={"w_100p hide_picker_icon" + (this.state.carUsageStart && this.state.carUsageStart._isAMomentObject ? "" : " _empty")}/>*/}
									<Input data-inputmask={dateFormatMask}
										className={"w_100p" + ((this.state.carUsageStart + '').length ? "" : " _empty")}
										   value={this.state.carUsageStart}
										   onChange={this.onCarUsageChange} defaultValue=""/>
									<div className="float_placeholder">{'Дата начала \n эксплуатации'}</div>
								</Col>
							</Row>

							<Row className="kasko-car-select__controls" gutter={20}>
								<Col span={6}>
									<Input className={"w_100p" + ((this.state.carPower + '').length ? "" : " _empty")}
										   data-inputmask={carPowerMask}
										   value={this.state.carPower}
										   onChange={this.onCarPowerChange} defaultValue=""/>
									<div className="float_placeholder">Мощность двигателя, л.с.</div>
								</Col>
								<Col span={6}>
									<Select
										dropdownClassName="select_dropdown_v1" className={"w_100p" + (this.state.carATS.length ? "" : " _empty")}
										placeholder=""
										onChange={this.onATSChange}
										value={this.state.carATS}
									>
										{this.state.carATSList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
									<div className="float_placeholder">Противоугонная система</div>
								</Col>
								<Col className="checkbox_middle check_v3" span={6}>
									<Checkbox onChange={this.onAutoStartChange}>Автозапуск</Checkbox>
								</Col>
							</Row>
						</>
						: ""
				}

				<Radio.Group className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")} onChange={this.onCarCreditChange}>
					<Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2" gutter={20}>
						<Col>
							<Radio disabled={this.state.allowPayment ? null : "disabled"} checked={this.state.carCredit ? "checked" : ""} value={1}>В кредит</Radio>
						</Col>
						<Col>
							<Radio disabled={this.state.allowPayment ? null : "disabled"} checked={!this.state.carCredit ? "checked" : ""} value={0}>За наличные</Radio>
						</Col>
						
						{
							this.state.showAdditional ?
								""
								:
								<>
									<Col className="kasko-car-select__price--holder">
										<div className="kasko-car-select__price">
											<div className="kasko-car-select__price--label _inactive">Стоимость автомобиля
											</div>
											<div
												className={"kasko-car-select__price--value" + (this.state.carPrice > 0 ? "" : " _inactive")}>{this.state.carPrice > 0 ? formatMoney(this.state.carPrice) : 0} ₽
											</div>
										</div>
									</Col>
									<Col className="kasko-car-select__additional _inactive">
										<div className="gl_link" onClick={this.toggleAdditionalFields}>Дополнительно</div>
									</Col>
								</>
						}
						
					</Row>
				</Radio.Group>
				
				{
					allFields ?
					""
					: 
					this.state.carFound ? <div className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive__" : "")}>
						<img src={'./cars/' + image + '.png'} alt=""/>
					</div> : ""
				}

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

export default KaskoCarSelect;
