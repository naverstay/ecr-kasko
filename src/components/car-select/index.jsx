import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, Checkbox, Form, Radio} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";
import FormInput from "../form-input";
import FormSelect from "../form-select";

const {Option} = Select;
//const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class CarSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFields: (this.props.step === 1 ? ['carMark'] : []),
			carFound: void 0,
			reopen: false,
			showAdditional: false,
			formBusy: false,
			carAutoStart: false,
			carCredit: true,
			showCarOptions: this.props.showCarOptions || false,
			newCar: this.props.fill ? true : null,
			allowPayment: this.props.fill,
			carPrice: this.props.fill ? 1534000 : 0,
			carPower: this.props.fill ? 245 : 0,
			carMileage: this.props.fill ? 245000 : 0,
			carRegion: this.props.fill ? 'г. Москва' : '',
			carMark: this.props.fill ? 'Hyundai' : '',
			carModel: this.props.fill ? 'Sonata' : '',
			carEquipment: this.props.fill ? '2.0 MPI - 6AT' : '',
			carATS: this.props.fill ? 'Noname' : '',
			carNumber: this.props.fill ? 'A 123 AA 177' : '',
			carUsageStart: this.props.fill ? '18.05.2015' : '',
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

		this.state['carYear'] = this.props.fill ? '2015' : this.state.newCar ? '' + (new Date()).getFullYear() : ''
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		imageCallback: PropTypes.func,
		step: PropTypes.number
	};

	formRef = React.createRef();
	
	toggleCarOptions = () => {
		this.setState({showCarOptions: !this.state.showCarOptions, reopen: true})
	}

	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		if (name in this.state) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
			this.checkReadyState()
		} else {
			console.log('no name in state', name);
		}
		
		switch (name) {
			case 'carNumber':
				this.setState({carFound: void 0})
				break
			case 'carMark':
				this.updateImage(value)
				this.removeActiveField('carMark')
				this.addActiveField('carModel')
				break
			case 'carModel':
				this.removeActiveField('carModel')
				this.addActiveField('carEquipment')
				break
			case 'carEquipment':
				this.removeActiveField('carEquipment')

				if (!this.state.newCar) {
					this.addActiveField('carYear')
				}
				break
			case 'carYear':
				this.removeActiveField('carYear')
				this.addActiveField('carNumber')
				break
		}
	};
	
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

				this.setState({carFound: allFieldsReady, allowPayment: allFieldsReady, carPrice: (allFieldsReady ? 1534000 : 0)})

				setTimeout(() => {
					if (allFieldsReady) this.updateImage(this.state.carMark)
				}, 0)
			}
		}, 0)
	};
	
	toggleAdditionalFields = e => {
		this.setState({showAdditional: !this.state.showAdditional})
	};
	
	removeActiveField = (field) => {
		let fields = this.state.activeFields.slice(0)
		let index = fields.indexOf(field)

		if (index > -1) {
			fields.splice(index, 1);
			
			this.setState({activeFields: fields})
		}
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

	onAutoStartChange = e => {
		this.setState({carAutoStart: e.target.checked})
	};

	onFinish = values => {
		this.setState({formBusy: true})
		
		setTimeout(() => {
			let found = true
			this.setState({formBusy: false, carFound: found})
			
			if (found) {
				this.setState({
					allowPayment: true,
					carATS: 'Noname',
					carMark: 'Mazda',
					carModel: 'CX-5',
					carEquipment: '2.0 MPI - 6AT',
					carNumber: 'A 123 AA 177',
					carRegion: 'г. Москва',
					carPrice: 1534000,
					carPower: 245,
					carMileage: 24500,
					carYear: '2015',
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
			carPrice: 1524000,
			carYear: '' + (new Date()).getFullYear(),
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
		if (this.props.imageCallback && this.state.carFound) this.props.imageCallback(img)
	};
	
	render() {
		const {allFields, step, hideOffers, fill, collapseCarInfo} = this.props;
		let {image} = this.props;
		//const dateFormat = "DD.MM.YY"
		let dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
		let yearList = []

		for (let y = (new Date()).getFullYear(); y > 1980; y--) {
			yearList.push(y)
		}
		
		let carNonCreditList = [{
				name: 'ОСАГО',
				price: 10456,
				button: 'Рассчитать',
				link: '/osago',
				prefix: 'от',
				suffix: '₽'
			},
				{
					name: 'КАСКО',
					price: 10420,
					button: 'Рассчитать',
					link: '/kasko',
					prefix: 'от',
					suffix: '₽'
				},
				//{
				//	name: 'GAP',
				//	price: 10430,
				//	button: 'Рассчитать',
				//	link: '/gap',
				//	prefix: 'от',
				//	suffix: '₽'
				//},
				{
					name: 'Ассистанс',
					price: '15400',
					collapse: true,
					options: [
						'эвакуация',
						'юридическая помощь',
						'аварийный комиссар',
						'подвоз бензина',
						'вскрытие автомобиля',
						'запуск автомобиля',
						'трезвый водитель',
						'выездной шиномонтаж'
					],
					prefix: 'от',
					suffix: '₽'
				},
				{
					name: 'Шоколад',
					price: 10555,
					collapse: true,
					options: [
						'эвакуация',
						'юридическая помощь',
						'аварийный комиссар',
						'подвоз бензина',
						'вскрытие автомобиля',
						'запуск автомобиля',
						'трезвый водитель',
						'выездной шиномонтаж'
					],
					prefix: 'от',
					suffix: '₽'
				}]
		
		let carCreditList = [
			{
				name: 'Кредит',
				price: 10432,
				button: 'Рассчитать',
				href: '/credit',
				goto: true,
				prefix: 'от',
				suffix: '₽/мес'
			},
			{
				name: 'ОСАГО',
				price: 10410,
				button: 'Рассчитать',
				href: '/osago',
				goto: true,
				prefix: 'от',
				suffix: '₽'
			},
			{
				name: 'КАСКО',
				price: 10420,
				button: 'Рассчитать',
				href: '/kasko',
				goto: true,
				prefix: 'от',
				suffix: '₽'
			},
			//{
			//	name: 'GAP',
			//	price: 10430,
			//	button: 'Рассчитать',
			//	href: '/gap',
			//	prefix: 'от',
			//	suffix: '₽'
			//},
			{
				name: 'Сервис меню',
				price: 10789,
				button: 'Рассчитать',
				href: '/service',
				goto: true,
				prefix: 'от',
				suffix: '₽'
			},
			{
				name: 'Шоколад',
				price: 10555,
				collapse: true,
				options: [
					'эвакуация',
					'юридическая помощь',
					'аварийный комиссар',
					'подвоз бензина',
					'вскрытие автомобиля',
					'запуск автомобиля',
					'трезвый водитель',
					'выездной шиномонтаж'
				],
				prefix: 'от',
				suffix: '₽'
			}]

		console.log('this.state.activeFields', this.state.activeFields);
		
		//dateFormatMask = "'regex': '" + String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$` + "', 'showMaskOnHover': 'false'"
		
		//let rx = String.raw`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

		//console.log('dateFormatMask', dateFormatMask, rx);

		const carNumberMask = "'mask': 'A 999 AA 999'"
		const carPriceMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearIncomplete': 'true', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		const carPowerMask = "'alias': 'integer', 'groupSeparator': ' ', 'digitsOptional': true, 'autoGroup': true, 'rightAlign': 'false', 'clearMaskOnLostFocus': 'true', 'placeholder': '_'"
		let searchDisabled = !this.state.carNumber.length || this.state.carNumber.indexOf('_') > -1 || this.state.formBusy
				
		if (this.state.carMark) {
			//image = this.state.carMark
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
		
		//if (this.state.newCar) {
		//	setTimeout(() => {
		//		console.log('setTimeout');
		//		this.onCarYearChange((new Date()).getFullYear())
		//	}, 0)
		//}

		return (
			<div className="kasko-car-select">
				{!this.state.carFound ?
					<h1 className="kasko-main__title">Выберите автомобиль</h1> 
					:
					<div className="kasko-car-select__description">
						<div className="kasko-car-select__controls">
							<span onClick={this.toggleCarOptions}
								  className={"gl_link color_black kasko-car-select__controls--toggle " + (this.state.showCarOptions || !collapseCarInfo ? 'expanded' : 'collapsed')}>Mazda CX-5</span>
						</div>
						<div className="kasko-car-select__description--price">1 524 000 ₽</div>
						<div className="kasko-car-select__description--link gl_link">В архив</div>
					</div>
				}
				
				{this.state.showCarOptions || !this.state.carFound || !collapseCarInfo ? 
					<>
						<div className="kasko-car-select__controls radio_v2">
							<Radio.Group defaultValue={step === 1 ? (this.state.reopen ? (this.state.newCar ? 1 : 0) : null) : this.state.newCar ? 1 : null} onChange={this.onCarNewChange}>
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
		
						{this.state.newCar === null || this.state.newCar ? null :
							<Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
								<Row className="kasko-car-select__controls" gutter={20}>
									<FormInput span={6} onChangeCallback={this.formControlCallback}
											   placeholder="Госномер автомобиля"
											   inputmask={carNumberMask}
											   controlName={'carNumber'} value={this.state.carNumber}/>
											   
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
		
						{this.state.newCar === null ? null :
							<Row className="kasko-car-select__controls" gutter={20}>
								<FormSelect span={6} onChangeCallback={this.formControlCallback}
										options={this.state.markList}
										className={this.activeClass('carMark')}
										placeholder="Марка" controlName={'carMark'}
										value={this.state.carMark}/>
	
								<FormSelect span={6} onChangeCallback={this.formControlCallback}
											options={this.state.modelList}
											className={this.activeClass('carModel')}
											placeholder="Модель" controlName={'carModel'}
											value={this.state.carModel}/>
		
								<FormSelect span={6} onChangeCallback={this.formControlCallback}
											options={this.state.equipmentList}
											className={this.activeClass('carEquipment')}
											placeholder="Комплектация" controlName={'carEquipment'}
											value={this.state.carEquipment}/>

								<FormInput span={6} onChangeCallback={this.formControlCallback}
										   placeholder="Стоимость, ₽"
										   disabled={this.state.newCar ? "disabled" : ""}
										   inputmask={carPowerMask}
										   controlName={'carPrice'} value={this.state.carPrice}/>
											
								{/*<FormSelect span={6} onChangeCallback={this.formControlCallback}*/}
								{/*			options={yearList}*/}
								{/*			className={this.activeClass('carYear')}*/}
								{/*			disabled={this.state.newCar ? "disabled" : ""}*/}
								{/*			placeholder="Год выпуска" controlName={'carYear'}*/}
								{/*			value={this.state.carYear}/>*/}
							</Row>
						}
						
						{this.state.showAdditional ?
							<>
								<Row className="kasko-car-select__controls" gutter={20}>
									<FormInput span={6} onChangeCallback={this.formControlCallback}
											   placeholder="Пробег, км"
											   inputmask={carPowerMask}
											   controlName={'carMileage'} value={this.state.carMileage}/>

									{/*<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
									{/*		   placeholder="Стоимость, ₽"*/}
									{/*		   inputmask={carPriceMask}*/}
									{/*		   controlName={'carPrice'} value={''}/>*/}
											   
									<FormInput span={6} onChangeCallback={this.formControlCallback}
											   placeholder="Регион эксплуатации"
											   controlName={'carRegion'} value={this.state.carRegion}/>

									<FormInput span={6} onChangeCallback={this.formControlCallback}
											   placeholder={"Дата начала \n эксплуатации"}
											   inputmask={dateFormatMask}
											   controlName={'carUsageStart'} value={this.state.carUsageStart}/>
								</Row>
		
								<Row className="kasko-car-select__controls" gutter={20}>
									<FormInput span={6} onChangeCallback={this.formControlCallback}
											   placeholder="Мощность двигателя, л.с."
											   inputmask={carPowerMask}
											   controlName={'carPower'} value={this.state.carPower}/>

									<FormSelect span={6} onChangeCallback={this.formControlCallback}
												options={this.state.carATSList}
												className={(allFields ? "wrapper-error" : "")}
												placeholder="Противоугонная система" controlName={'carATS'}
												value={this.state.carATS}/>
												
									<Col span={6} className="checkbox_middle check_v3">
										<Checkbox onChange={this.onAutoStartChange}>Автозапуск</Checkbox>
									</Col>
									
									<Col span={6} className="kasko-car-select__additional _inactive text_right">
										<div className="gl_link" onClick={this.toggleAdditionalFields}>Скрыть</div>
									</Col>
								</Row>
							</>
							: null
						}
		
						{this.state.newCar === null ? null :
							<Radio.Group defaultValue={step === 1 ? 1 : 0} className={"w_100p " + (this.state.showAdditional ? "full_form" : "short_form")} onChange={this.onCarCreditChange}>
								<Row className="kasko-car-select__controls kasko-car-select__controls--price radio_v2" gutter={20}>
									{/*<Col className={this.state.allowPayment ? "" : "vis_hidden"}>*/}
									{/*	<Radio disabled={this.state.allowPayment ? null : "disabled"} value={1}>В кредит</Radio>*/}
									{/*</Col>*/}
									{/*<Col className={this.state.allowPayment ? "" : "vis_hidden"}>*/}
									{/*	<Radio disabled={this.state.allowPayment ? null : "disabled"} value={0}>За наличные</Radio>*/}
									{/*</Col>*/}
									
									{
										this.state.showAdditional ? null :
											<>
												<Col className={"kasko-car-select__price--holder" + (this.state.allowPayment ? "" : " vis_hidden")}>
													{/*<div className="kasko-car-select__price">*/}
													{/*	<div className="kasko-car-select__price--label _inactive">Стоимость автомобиля*/}
													{/*	</div>*/}
													{/*	<div*/}
													{/*		className={"kasko-car-select__price--value" + (this.state.carPrice > 0 ? "" : " _inactive")}>{this.state.carPrice > 0 ? formatMoney(this.state.carPrice) : 0} ₽*/}
													{/*	</div>*/}
													{/*</div>*/}
												</Col>
												<Col className="kasko-car-select__additional _inactive">
													<div className="gl_link" onClick={this.toggleAdditionalFields}>Дополнительно</div>
												</Col>
											</>
									}
								</Row>
							</Radio.Group>
						}
					</>
					: null
				}
				
				{
					allFields ? null : 
					<div className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive__" : "")}>
						<img src={'./cars/' + image + '.png'} alt=""/>
					</div> 
				}

				{/*{fill ? null :*/}
				{/*	(!this.state.formBusy && this.state.carFound && !hideOffers) ?*/}
				{/*		<KaskoOffers offersList={this.state.carCredit ? carCreditList : carNonCreditList}/>*/}
				{/*		:*/}
				{/*		<KaskoOffers disabled={true} offersList={[*/}
				{/*				{*/}
				{/*					name: 'Кредит',*/}
				{/*					price: 0,*/}
				{/*					button: 'Рассчитать',*/}
				{/*					prefix: 'от',*/}
				{/*					suffix: '₽/мес'*/}
				{/*				},*/}
				{/*				{*/}
				{/*					name: 'ОСАГО',*/}
				{/*					price: 0,*/}
				{/*					button: 'Рассчитать',*/}
				{/*					prefix: 'от',*/}
				{/*					suffix: '₽'*/}
				{/*				},*/}
				{/*				{*/}
				{/*					name: 'КАСКО',*/}
				{/*					price: 0,*/}
				{/*					button: 'Рассчитать',*/}
				{/*					prefix: 'от',*/}
				{/*					suffix: '₽'*/}
				{/*				},*/}
				{/*				{*/}
				{/*					name: 'GAP',*/}
				{/*					price: 0,*/}
				{/*					button: 'Рассчитать',*/}
				{/*					prefix: 'от',*/}
				{/*					suffix: '₽'*/}
				{/*				}*/}
				{/*			]}/>*/}
				{/*}*/}
			</div>
		);
	}
}

export default CarSelect;
