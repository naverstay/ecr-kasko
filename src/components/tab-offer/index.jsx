import React, {Component} from "react";
import {Col, Row, Button, Radio, Slider, Input, Tooltip} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {Link} from "react-router-dom";
import {Switch, Checkbox} from "antd";
import CalculationPopup from "../calculation-popup";
import {formatMoney} from "../../helpers/formatMoney";
//import pluralFromArray from "../../helpers/pluralFromArray";
import CalculationOffers from "../calculation-offers";
import PaymentSwitch from "../payment-switch";
import DriverCount from "../driver-count";
import KaskoCarSelect from "../kasko-car-select";
import PopupOverlay from "../popup-overlay";
import FormInput from "../form-input";

moment().locale('ru', ru);

class TabOffer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: this.props.osago || (this.props.step === 2),
			showCalculationOffers: this.props.step > 1,
			showCarOptions: false,
			showParams: false,
			openParams: true,
			SMSSent: true,
			calculationPopupOpened: false,
			formBusy: false,
			hasFranchise: this.props.step > 1,
			franchiseVal: 0,
			carCredit: true,
			carMark: '',
			carPrice: 0,
			carModel: '',
			SMSCode: '',
			carEquipment: '',
			carNumber: '',
			carYear: '',
			franchise: [
				10000,
				15000,
				30000,
				40000,
				50000,
				70000,
				100000
			],
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
			showPayment: this.props.osago ? this.props.step > 1 : false,
			showCompare: false,
			availablePayment: false,
			showMoreDamages: false,
			paramsChanged: true,
			selectedOffers: [],
			activeOffers: this.props.step > 1 ? [1] : []
		};
	}

	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.any,
		addCreditCallback: PropTypes.func,
		innerWidth: PropTypes.number
	};

	imageCallback = (img) => {
		this.setState({carImage: img})
	}
	
	updateSelectedOffer = (company, offers) => {
		let offerList = this.state.selectedOffers;
		let compare = true;
		
		let companyOffers = offerList.find((c) => c.company === company)

		if (companyOffers) {
			for (let o in offers) {
				if (offers.hasOwnProperty(o)) {
					let offer = offers[o]

					if (offer) {
						companyOffers.offers.push(o)
					} else {
						const index = companyOffers.offers.indexOf(o + '');
						if (index > -1) {
							companyOffers.offers.splice(index, 1);
						}
						
						if (!companyOffers.offers.length) {
							for (let i = 0; i < offerList.length; i++) {
								if (offerList[i].company === company) {
									offerList.splice(i, 1)
								}
								
							}
						}
					}
				}
			}
			
		} else {
			let arr = []

			for (let o in offers) {
				if (offers.hasOwnProperty(o)) {
					let offer = offers[o]
					
					if (offer) {
						arr.push(o)
					}
				}
			}

			offerList.push({company: company, offers: arr})
		}
		
		if (offerList.length === 1) {
			if (offerList[0].offers.length === 1) {
				compare = false
			}
		}
		
		this.setState({
			selectedOffers: offerList,
			showPayment: true,
			showCompare: offerList.length > 1 && compare,
			availablePayment: offerList.length > 0
		})
	}

	updatePaymentState = (value) => {
		console.log('updatePaymentState', value);
		if (this.state.showCalculationOffers) {
			this.setState({
				showCalculationOffers: true,
				showPayment: value
			})
		}

		if (this.props.osago) {
			this.setState({
				activeOffers: [1]
			})
		}
		
		this.toggleCalculationPopup()

		this.toggleCalculationOffers()
	}

	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		switch (name) {
			case 'SMSCode':
				this.setState({SMSCode: value})

				if (('' + value).length === 4) {
					this.nextStep(3)
				}
				
				break
		}
	};

	toggleCarOptions = () => {
		console.log('toggleCarOptions', this.state.showCarOptions);
		this.setState({showCarOptions: !this.state.showCarOptions})
	}

	addToCredit = () => {
		console.log('addToCredit');
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
		typeof this.props.addCreditCallback === 'function' && this.props.addCreditCallback() 
	}
	
	toggleCalculationPopup = () => {
		//this.setState({fullCalculation: true})
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}

	toggleShowParams = () => {
		this.state.showCalculationOffers && this.setState({openParams: !this.state.openParams})
	}
	
	nextStep = (step) => {
		console.log('nextStep', step);

		typeof this.props.tabCallback === 'function' && this.props.tabCallback(step)
	}

	toggleSMSSent = () => {
		this.setState({SMSSent: !this.state.SMSSent})
	}

	calculationButtonText = () => {
		return (this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length)) ? 'Анкета ' + (this.props.osago ? 'ОСАГО' : 'КАСКО') + ' заполните 0 полей' : this.state.fullCalculation ? (this.props.osago ? 'Для расчета заполните 20 полей' : 'Для окончательного расчета заполните 20 полей') : 'Для предварительного расчета заполните 10 полей'
	}

	offersUpdate = (offer) => {
		let activeOffers = this.state.activeOffers
		
		if (offer.active) {
			activeOffers.push(offer.id)
		} else {
			const index = activeOffers.indexOf(offer.id);
			if (index > -1) {
				activeOffers.splice(index, 1);
			}
		}
		
		this.setState({
			activeOffers: activeOffers,
			//paramsChanged: true
		});
	};

	toggleCalculationOffers = e => {
		if (this.state.paramsChanged) {
			this.setState({
				fullCalculation: true,
				showCalculationOffers: true,
				openParams: false,
				//paramsChanged: false
			});
		}
	};
	
	onDamagesChange = (checkedValues) => {
		this.setState({
			//paramsChanged: true
		})
	}

	onShowMoreDamagesChange = (checkedValues) => {
		this.setState({
			showMoreDamages: !this.state.showMoreDamages
		})
	}
	
	onPeriodChange = (e) => {
		this.setState({
			//paramsChanged: true
		})
	}
	
	onFranchiseChange = e => {
		this.setState({
			//paramsChanged: true,
			hasFranchise: e.target.value > 0,
		});
	};
	
	onFranchiseValueChange = val => {
		this.setState({
			franchiseVal: val
		})
	};

	onFranchiseTooltip = value => {
		//console.log('onFranchiseTooltip', value);
		
		return null // formatMoney(scaleValue(value, [0, 100], [this.state.franchise[0], this.state.franchise[this.state.franchise.length - 1]]))
	};

	onCarCreditChange = e => {
		this.setState({
			//paramsChanged: true,
			carCredit: !!e.target.value
		});
	};

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({behavior: "smooth"});
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}
	
	render() {
		const {step, osago, popup} = this.props;
		let {image} = this.props;
		
		//const periodPlurals = ['месяц', 'месяца', 'месяцев'];
		const periodOptions = [12, 9, 6, 3];
		const damageOptions = ['Ущерб', 'Полная гибель', 'Угон', 'Шины/Диски', 'ЛКП', 'Стекла', 'Фары', 'Бамперы и зеркала'];
		const franchise = this.state.franchise;
		
		let driverOptions = [];
		
		if (step > 1 || this.state.showCalculationOffers) {
			driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
		}
		
		let franchiseSteps = {
			//10000 : '10 000',
			//15000 : '15 000',
			//30000 : '30 000',
			//40000 : '40 000',
			//50000 : '50 000',
			//70000 : '70 000',
			//100000: '100 000'
		}
		
		const optionsFixtures = [
			'Территория страхования: РФ + СНГ',
			'Сбор справок',
			'Эвакуатор',
			'Круглосуточная консультация',
			'Сбор справок',
			'Несчастный случай: 300 000  ₽',
			'ДТП',
			'Пожар',
			'Повреждение отскочившим или упавшим предметом',
			'Стихийное бедствие',
			'Противоправные действия третьих лиц',
			'Действия животных',
			'Провал под грунт',
			'Техногенная авария',
			'Подтопление'
		]
		
		let calculationOfferList = [
			{
				logo: './logo/ingosstrakh.png',
				offers: [
					{
						name: 'Обычный',
						franchise: 10000,
						price: 41450,
						dealerFee: 4145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 2',
						franchise: 10000,
						price: 51450,
						dealerFee: 5145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 3',
						franchise: 10000,
						price: 61450,
						dealerFee: 6145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 4',
						franchise: 10000,
						price: 11450,
						dealerFee: 1145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 5',
						franchise: 10000,
						price: 21450,
						dealerFee: 2145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 6',
						franchise: 10000,
						price: 31450,
						dealerFee: 3145,
						options: optionsFixtures
					}
				]
			},
			{
				logo: './logo/bck.png',
				offers: [
					{
						name: 'Необычный',
						franchise: 10000,
						price: 30450,
						dealerFee: 3045,
						options: optionsFixtures
					},
					{
						name: 'Необычный 2',
						franchise: 10000,
						price: 30450,
						dealerFee: 3045,
						options: optionsFixtures
					},
					{
						name: 'Необычный 3',
						franchise: 10000,
						price: 30450,
						dealerFee: 3045,
						options: optionsFixtures
					}
				]
			}
		]
		
		if (step > 1) {
			calculationOfferList = [
				{
					logo: './logo/ingosstrakh.png',
					offers: [
						{
							name: 'Обычный',
							franchise: 10000,
							price: 41450,
							dealerFee: 4145,
							dateStart: '20.02.19',
							dateEnd: '19.02.20',
							options: optionsFixtures
						}
					]
				},
			]
		}
		
		if (step === 3) {
			if (image !== false) {
				image = "Hyundai"
			}
		}
		
		franchise.forEach((f, i) => {
			const index = i === 0 ? 0 : i === franchise.length - 1 ? 100 : parseInt(i * (100 / ((franchise.length - 1) || 1)))

			franchiseSteps[index] = {
				label: <span className={"kasko-car-select__franchise--label" + (index === this.state.franchiseVal ? " active" : "")}>{(i ? '' : 'до ') + formatMoney(f)}</span>,
			}
		})

		return (
			<>
				<div className="kasko-car-select">
					{step === 3 ?
						<>
							<CalculationOffers osago={osago} completed={true} selectedOffer={this.updateSelectedOffer} offersList={[
								{
									logo: './logo/bck.png',
									offers: [
										{
											name: 'Обычный',
											document: 'СС 12345678',
											dateStart: '20.02.19',
											dateEnd: '19.02.20',
											franchise: 10000,
											price: 41450,
											dealerFee: 4145
										}
									]
								}
							]}/>

							{/*<KaskoOffers step={step} active={[(osago ? 0 : 1)]} completed={[(osago ? 0 : 1)]} offersList={osago ?*/}
							{/*	[*/}
							{/*		{*/}
							{/*			name: 'ОСАГО',*/}
							{/*			price: 10333,*/}
							{/*			button: (!osago ? 'Рассчитать' : 'Выпущено'),*/}
							{/*			link: '/osago',*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		},*/}
							{/*		{*/}
							{/*			name: 'КАСКО',*/}
							{/*			price: 10420,*/}
							{/*			button: (osago ? 'Рассчитать' : 'Выпущено'),*/}
							{/*			link: '/kasko',*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		},*/}
							{/*		{*/}
							{/*			name: 'GAP',*/}
							{/*			price: 10430,*/}
							{/*			button: 'Рассчитать',*/}
							{/*			link: '/gap',*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		},*/}
							{/*		{*/}
							{/*			name: 'Ассистанс',*/}
							{/*			price: '15400',*/}
							{/*			collapse: true,*/}
							{/*			options: [*/}
							{/*				'эвакуация',*/}
							{/*				'юридическая помощь',*/}
							{/*				'аварийный комиссар',*/}
							{/*				'подвоз бензина',*/}
							{/*				'вскрытие автомобиля',*/}
							{/*				'запуск автомобиля',*/}
							{/*				'трезвый водитель',*/}
							{/*				'выездной шиномонтаж'*/}
							{/*			],*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		},*/}
							{/*		{*/}
							{/*			name: 'Шоколад',*/}
							{/*			price: 10555,*/}
							{/*			collapse: true,*/}
							{/*			options: [*/}
							{/*				'эвакуация',*/}
							{/*				'юридическая помощь',*/}
							{/*				'аварийный комиссар',*/}
							{/*				'подвоз бензина',*/}
							{/*				'вскрытие автомобиля',*/}
							{/*				'запуск автомобиля',*/}
							{/*				'трезвый водитель',*/}
							{/*				'выездной шиномонтаж'*/}
							{/*			],*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		}]*/}
							{/*	: */}
							{/*	[{*/}
							{/*		name: 'ОСАГО',*/}
							{/*		price: 10444,*/}
							{/*		button: (!osago ? 'Рассчитать' : 'Выпущено'),*/}
							{/*		link: '/osago',*/}
							{/*		prefix: 'от',*/}
							{/*		suffix: '₽'*/}
							{/*	},*/}
							{/*	{*/}
							{/*		name: 'КАСКО',*/}
							{/*		price: 10420,*/}
							{/*		button: (osago ? 'Рассчитать' : 'Выпущено'),*/}
							{/*		link: '/kasko',*/}
							{/*		prefix: 'от',*/}
							{/*		suffix: '₽'*/}
							{/*	},*/}
							{/*	{*/}
							{/*		name: 'GAP',*/}
							{/*		price: 10430,*/}
							{/*		button: 'Рассчитать',*/}
							{/*		link: '/gap',*/}
							{/*		prefix: 'от',*/}
							{/*		suffix: '₽'*/}
							{/*	},*/}
							{/*	{*/}
							{/*		name: 'Ассистанс',*/}
							{/*		price: '15400',*/}
							{/*		collapse: true,*/}
							{/*		options: [*/}
							{/*			'эвакуация',*/}
							{/*			'юридическая помощь',*/}
							{/*			'аварийный комиссар',*/}
							{/*			'подвоз бензина',*/}
							{/*			'вскрытие автомобиля',*/}
							{/*			'запуск автомобиля',*/}
							{/*			'трезвый водитель',*/}
							{/*			'выездной шиномонтаж'*/}
							{/*		],*/}
							{/*		prefix: 'от',*/}
							{/*		suffix: '₽'*/}
							{/*	},*/}
							{/*		{*/}
							{/*			name: 'Шоколад',*/}
							{/*			price: 10555,*/}
							{/*			collapse: true,*/}
							{/*			options: [*/}
							{/*				'эвакуация',*/}
							{/*				'юридическая помощь',*/}
							{/*				'аварийный комиссар',*/}
							{/*				'подвоз бензина',*/}
							{/*				'вскрытие автомобиля',*/}
							{/*				'запуск автомобиля',*/}
							{/*				'трезвый водитель',*/}
							{/*				'выездной шиномонтаж'*/}
							{/*			],*/}
							{/*			prefix: 'от',*/}
							{/*			suffix: '₽'*/}
							{/*		}]*/}
							{/*}/>*/}
							
						</>
						:
						<>
							{(step !== 2) ?
								<>
									{!osago ? 
										<>
											{/*<div className="kasko-car-select__caption">{'Добавить в КАСКО'}</div>*/}
											
											<KaskoOffers step={step} active={[0,1,2,3,4,5,6]} onOfferSelect={this.offersUpdate} credit={true} slider={true} offersList={[
													{
														name: 'GAP',
														price: 11400,
														prefix: '',
														suffix: '₽'
													},
													{
														name: 'Несчастный случай',
														price: 10410,
														prefix: '',
														suffix: '₽'
													},
													{
														name: 'Аварийный комиссар',
														price: 10420,
														prefix: '',
														suffix: '₽'
													},
													{
														name: 'Стекла без справок',
														price: 10430,
														prefix: '',
														suffix: '₽'
													},
													{
														name: 'ОСАГО',
														price: 10410,
														prefix: '',
														suffix: '₽'
													},
													{
														name: 'Шоколад',
														price: 10420,
														prefix: '',
														suffix: '₽'
													},
													{
														name: '123',
														price: 10430,
														prefix: '',
														suffix: '₽'
													}
												]}/>
										</> 
										: null }

									{!osago ? <div onClick={this.toggleShowParams}
										 className={"kasko-car-select__caption" + (this.state.showCalculationOffers ? (this.state.openParams ? " expanded" : " collapsed") : "")}>Параметры КАСКО</div> : null }
									
									{(!this.state.showCalculationOffers || this.state.openParams || osago) ?
										<>
											{!osago ?
												<>
													<div className="kasko-car-select__controls radio_v2 wide_group mb_0">
														<Radio.Group defaultValue={popup ? 1 : 0} className={"w_100p"} onChange={this.onCarCreditChange}>
															<Row gutter={20}>
																<Col>
																	<Radio value={1}>В кредит</Radio>
																</Col>
																<Col>
																	<Radio value={0}>За наличные</Radio>
																</Col>
															</Row>
														</Radio.Group>
													</div>
													<div className="kasko-car-select__controls radio_v2 wide_group">
														<Radio.Group defaultValue={this.state.hasFranchise ? 1 : 0}
																	 onChange={this.onFranchiseChange}>
															<Row gutter={20}>
																<Col>
																	<Radio value={0}>Без франшизы</Radio>
																</Col>
																<Col>
																	<Radio value={1}>Франшиза с 1 случая</Radio>
																</Col>
																<Col>
																	<Radio value={2}>Франшиза со 2 случая</Radio>
																</Col>
	
																{this.state.hasFranchise ?
																	<Col className={"kasko-car-select__controls--flex-1"}>
																		<Slider className="kasko-car-select__franchise"
																				step={null}
																				tooltipVisible={false}
																				tipFormatter={this.onFranchiseTooltip}
																				onAfterChange={this.onFranchiseValueChange}
																				marks={franchiseSteps}
																				defaultValue={franchiseSteps[2]}/>
																	</Col>
																	: ""
																}
															</Row>
														</Radio.Group>
													</div>
	
													<div className="kasko-car-select__controls check_v2 mb_10">
														<Checkbox.Group defaultValue={damageOptions.map((o, i) => i)}
																		onChange={this.onDamagesChange}>
															<Row gutter={20}>
																{
																	<>
																		{
																			damageOptions.slice(0, (this.state.showMoreDamages ? damageOptions.length : 3)).map((c, i) =>
																				<Col key={i}>
																					<Checkbox value={i}>{c}</Checkbox>
																				</Col>
																			)
																		}
																		<Col>
																			<div className="kasko-offer__more">
																				<div onClick={this.onShowMoreDamagesChange}
																					 className="gl_link">{this.state.showMoreDamages ? "Скрыть" : "Показать еще"}</div>
																			</div>
																		</Col>
																	</>
																}
															</Row>
														</Checkbox.Group>
													</div>
												</>
											: null}

											{osago ?
												<div onClick={this.toggleShowParams} className={"kasko-car-select__caption" + (this.state.activeOffers.length ? (this.state.openParams ? " expanded" : " collapsed") : "")}>Параметры ОСАГО</div>
											: null}

											{(!osago || this.state.openParams) ?
													<>
														<div className={"kasko-car-select__caption fz_12"}>Срок
															действия, месяцы
														</div>

														<div className="kasko-car-select__controls radio_v3">
															<Radio.Group defaultValue={periodOptions[0]}
																		 style={{width: '100%'}}
																		 onChange={this.onPeriodChange}>
																<Row gutter={20}>
																	{
																		periodOptions.map((c, i) => <Col key={i}>
																				<Radio value={c}>
																					<span
																						className="kasko-car-select__period--value">{c}</span>
																					{/*<span className="kasko-car-select__period--label">{pluralFromArray(periodPlurals, c)}</span>*/}
																				</Radio>
																			</Col>
																		)
																	}
																</Row>
															</Radio.Group>
														</div>

														<DriverCount step={step} driverOptions={driverOptions}>
															{step > 1 || this.state.showCalculationOffers ?
																<Col>
																	<div className="kasko-offer__more">
																		<span onClick={this.toggleCalculationPopup}
																			  className="gl_link">Анкета КАСКО</span>
																	</div>
																</Col>
															: null}
														</DriverCount>

														{this.state.showCalculationOffers ? null :
															<>
																<Row gutter={20} className="kasko-car-select__controls ant-row-center mb_45">
																	{osago ? null :
																		<Col span={6}>
																			<Button className={"w_100p ant-btn"}
																			>Отказ клиента</Button>
																		</Col>
																	}
																	<Col span={12}>
																		<Button htmlType="submit"
																				className={"w_100p" + (((this.state.showPayment || (this.props.step === 2) || (this.props.osago && this.state.activeOffers.length))) ? " btn_green" : " ant-btn-primary")} 
																				onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
																	</Col>
																	{osago ? null :
																		<Col span={6}>
																			<Button to="/credit_kasko"
																					className={"w_100p ant-btn"}
																			>Внести полис вручную</Button>
																		</Col>
																	}
																</Row>
															</>
														}
														
														{/*<div className="kasko-car-select__controls ant-row-center">*/}
														{/*	<div onClick={this.toggleCalculationOffers} className={"ant-btn ant-btn-primary btn_middle margin" + ((step !== 2 && this.state.paramsChanged) ? "" : " disabled")}>Получить расчет</div>*/}
														{/*</div>*/}
														
													</>
											: null }
										</>
										: null
									}
								</> : null
							}
							
							{this.state.showCalculationOffers ?
									<>
										<CalculationOffers franchise={this.state.hasFranchise} allowCheck={this.state.showPayment || osago || popup} osago={osago} waiting={step === 2} selectedOffer={this.updateSelectedOffer} offersList={calculationOfferList}/>
		
										<Row gutter={20} className={"kasko-car-select__controls ant-row-center align_center"}>
											{
												(step === 2) ?
													<>
														<>
															<Col span={6} className="text_left">
																<Tooltip overlayClassName="tooltip_v1" placement="bottomLeft"
																		 title="Отменить операцию и вернуться к расчету">
																	<Button onClick={() => {this.nextStep(void 0)}} className={"ant-btn btn_green fz_14 w_100p"}>Вернуться к расчету</Button>
																</Tooltip>
															</Col>
															<Col span={3}/>
														</>
														{
															this.state.SMSSent ?
																<>
																	<Col span={6} className="text_center">
																		<div className="offer-select__sms">
																			<FormInput span={null}
																					   maxLength={4}
																					   onChangeCallback={this.formControlCallback}
																					   placeholder="Код подтверждения"
																					   controlName={'SMSCode'}
																					   value={''}/>
																			<div className="gl_link"
																				 onClick={this.toggleSMSSent}>Отправить код повторно</div>
																		</div>
																	</Col>
																	<Col span={9} className="kasko-car-select__controls--group-w text_left">
																		<p>
																			Попросите клиента продиктовать код, <br />
																			который был отправлен ему <br/>
																			на мобильный телефон
																		</p>
																	</Col>
																</>
																:
																<>
																	<Col span={6}
																		className="text_center">
																		<Button htmlType="submit"
																				className={"ant-btn-primary btn_middle"}
																				onClick={this.toggleSMSSent}>Оплатить в кассу</Button>
																	</Col>
																	<Col span={9}
																		className="text_right">
																		<div className={"gl_link"}>Отправить ссылку повторно</div>
																	</Col>
																</>
														}
													</>
												: (this.state.showPayment || osago) ?
													<>
														<Col span={6}/>
														<Col span={6}>
															<Button onClick={() => {this.state.availablePayment && this.nextStep(2)}}
															   className={"ant-btn ant-btn-primary w_100p" + ((this.state.availablePayment) ? "" : " disabled")}>{this.state.showCompare ? 'Сравнить' : 'Оплатить в кассу'}</Button>
														</Col>
														<Col span={6}>
															<PaymentSwitch
																allowPayment={this.state.availablePayment}
																paymentStep={0}/>
														</Col>
													</>
													:
													popup ?
														<>
															<Col span={12}>
																<Button htmlType="submit"
																		className={"ant-btn-primary btn_wide"}
																		onClick={this.addToCredit}>Добавить в кредит</Button>
															</Col>
															<Col span={24}/>
															<Col span={12}>
																<Button htmlType="submit"
																	className={"btn_wide"}
																	onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
															</Col>
														</>
														:
														<>
															<Col span={6}>
																<Link to="/credit_kasko" className={"w_100p ant-btn"}>Отказ клиента</Link>
															</Col>
															<Col span={12}>
																<Button htmlType="submit"
																	className={"ant-btn-primary w_100p"}
																	onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
															</Col>
															<Col span={6}>
																<Link to="/credit_kasko" className={"w_100p ant-btn"}>Добавить в кредит</Link>
															</Col>
														</>
												
											}
										</Row>
									</>
								: null
							}
						</>
					}
				</div>
				
				<div ref={(el) => { this.messagesEnd = el }}/>
				
				{this.state.calculationPopupOpened ?
					<PopupOverlay span={16}>
						<CalculationPopup osago={osago} updatePaymentState={this.updatePaymentState} step={this.state.showCalculationOffers ? 2 : step} allFields={this.state.showCalculationOffers || (step === 2)} fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation} popupCloseFunc={this.toggleCalculationPopup} />
					</PopupOverlay>
					: null
				}
			</>
		);
	}
}

export default TabOffer;
