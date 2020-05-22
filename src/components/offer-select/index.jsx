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
import pluralFromArray from "../../helpers/pluralFromArray";
import CalculationOffers from "../calculation-offers";
import PaymentSwitch from "../payment-switch";
import DriverCount from "../driver-count";

moment().locale('ru', ru);

class OfferSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: (this.props.step === 2),
			showCalculationOffers: this.props.step > 1,
			showParams: false,
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
			showPayment: this.props.step > 1,
			showCompare: false,
			availablePayment: false,
			showMoreDamages: false,
			paramsChanged: false,
			selectedOffers: [],
			activeOffers: this.props.step > 1 ? [1] : []
		};
	}

	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.string,
		innerWidth: PropTypes.number
	};

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
		if (this.state.showCalculationOffers) {
			this.setState({
				showPayment: value
			})
		}
		
		this.toggleCalculationPopup()
	}

	onSMSCodeChange = e => {
		this.setState({SMSCode: e.target.value})
		
		if (('' + e.target.value).length === 4) {
			window.location = '/done'
		}
	};
	
	onCalculationTypeChange = (checked) => {
		this.setState({
			fullCalculation: (this.props.step === 2) || checked
		})
	}
	
	toggleCalculationPopup = () => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}

	toggleShowParams = () => {
		this.setState({showParams: !this.state.showParams})
	}

	toggleSMSSent = () => {
		this.setState({SMSSent: !this.state.SMSSent})
	}

	calculationButtonText = () => {
		return this.state.showPayment || (this.props.step === 2) ? 'Анкета КАСКО заполните 0 полей' : this.state.fullCalculation ? 'Для окончательного расчетазаполните 20 полей ' : 'Для расчета заполните  10 полей'
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
			paramsChanged: true
		});
	};

	toggleCalculationOffers = e => {
		if (this.state.activeOffers.length && this.state.paramsChanged) {
			this.setState({
				fullCalculation: true,
				showCalculationOffers: true,
				paramsChanged: false
			});
		}
	};
	
	onDamagesChange = (checkedValues) => {
		this.setState({
			paramsChanged: true
		})
	}

	onShowMoreDamagesChange = (checkedValues) => {
		this.setState({
			showMoreDamages: !this.state.showMoreDamages
		})
	}
	
	onPeriodChange = (e) => {
		this.setState({
			paramsChanged: true
		})
	}
	
	onFranchiseChange = e => {
		this.setState({
			paramsChanged: true,
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
			paramsChanged: true,
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
		const {step} = this.props;
		let {image} = this.props;
		
		const periodPlurals = ['месяц', 'месяца', 'месяцев'];
		const periodOptions = [12, 9, 6, 3];
		const damageOptions = ['Ущерб', 'Полная гибель', 'Угон', 'Шины/Диски', 'ЛКП', 'Стекла', 'Фары', 'Бамперы и зеркала'];
		const franchise = this.state.franchise;
		
		let driverOptions = [];
		
		if (step > 1) {
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
						price: 41450,
						dealerFee: 4145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 2',
						price: 51450,
						dealerFee: 5145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 3',
						price: 61450,
						dealerFee: 6145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 4',
						price: 11450,
						dealerFee: 1145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 5',
						price: 21450,
						dealerFee: 2145,
						options: optionsFixtures
					},
					{
						name: 'Обычный 6',
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
						price: 30450,
						dealerFee: 3045,
						options: optionsFixtures
					},
					{
						name: 'Необычный 2',
						price: 30450,
						dealerFee: 3045,
						options: optionsFixtures
					},
					{
						name: 'Необычный 3',
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
							price: 41450,
							dealerFee: 4145,
							options: optionsFixtures
						}
					]
				},
			]
		}
		
		if (step === 3) {
			image = "Hyundai"
		}
		
		franchise.forEach((f, i) => {
			const index = i === 0 ? 0 : i === franchise.length - 1 ? 100 : parseInt(i * (100 / ((franchise.length - 1) || 1)))

			franchiseSteps[index] = {
				label: <span className={"kasko-car-select__franchise--label" + (index === this.state.franchiseVal ? " active" : "")}>{formatMoney(f)}</span>,
			}
		})

		return (
			<>
				<div className="kasko-car-select">
					<h1 className="kasko-main__title">Рассчитать КАСКО</h1>
	
					<div className="kasko-car-select__controls">
						<Link className="gl_link color_black" to="/kasko">Автомобиль</Link>
					</div>
	
					<div className="kasko-car-select__image">
						<img src={'./cars/' + image + '.png'} alt=""/>
					</div>
	
					{step === 3 ?
						<>
							<h1 className="kasko-main__title">Полис оплачен</h1>

							<CalculationOffers completed={true} selectedOffer={this.updateSelectedOffer} offersList={[
								{
									logo: './logo/bck.png',
									offers: [
										{
											name: 'Обычный',
											document: 'СС 12345678',
											dateStart: '20.02.19',
											dateEnd: '19.02.20',
											price: 41450,
											dealerFee: 4145
										}
									]
								}
							]}/>
						
						</>
						:
						<>
							<div className={"kasko-car-select__calculation" + (this.state.fullCalculation ? ' active' : '') + (this.state.showPayment || (step === 2) ? ' disabled' : '')}>
								<span className="kasko-car-select__calculation--text">Предварительный расчет</span>
								<Switch checked={this.state.fullCalculation} className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
								<span className="kasko-car-select__calculation--text">Окончательный расчет</span>
							</div>
			
							<div className="kasko-car-select__controls ant-row-center mb_45">
								<Button htmlType="submit" className={"ant-btn-primary btn_wide"} onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
							</div>
							
							{(step !== 2) ?
								<>
									<div className="kasko-car-select__caption">
										Добавить в КАСКО
									</div>
									
									<div className="kasko-car-select__carousel">
										<KaskoOffers onOfferSelect={this.offersUpdate} slider={true} offersList={[
											{
												name: 'GAP',
												price: 10400,
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
												name: 'Кредит',
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
									</div>
									
									{
										(!this.state.showCalculationOffers || this.state.showParams) ?
										<>
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
											<Checkbox.Group defaultValue={damageOptions.map((o, i) => i)} onChange={this.onDamagesChange}>
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

											<div className={"kasko-car-select__caption fz_12"}>Срок действия в месяцах</div>

											<div className="kasko-car-select__controls radio_v3">
											<Radio.Group defaultValue={periodOptions[0]} style={{width: '100%'}} onChange={this.onPeriodChange}>
											<Row gutter={20}>
											{
												periodOptions.map((c, i) => <Col key={i}>
														<Radio value={c}>
															<span className="kasko-car-select__period--value">{c}</span>
															{/*<span className="kasko-car-select__period--label">{pluralFromArray(periodPlurals, c)}</span>*/}
														</Radio>
													</Col>
												)
											}
											</Row>
											</Radio.Group>
											</div>
			
											<DriverCount step={step} driverOptions={driverOptions} />
		
											<div className="kasko-car-select__controls ant-row-center">
												<div onClick={this.toggleCalculationOffers}
													 className={"ant-btn ant-btn-primary btn_middle margin" + ((step !== 2 && this.state.activeOffers.length && this.state.paramsChanged) ? "" : " disabled")}>Получить расчет</div>
											</div>
										</>
										: ""
									}
								</> : ""
							}
							
							{this.state.showCalculationOffers ?
									<>
										<CalculationOffers allowCheck={this.state.showPayment} waiting={step === 2} selectedOffer={this.updateSelectedOffer} offersList={calculationOfferList}/>
		
										<div className={"kasko-car-select__controls ant-row-center align_center"}>
											{
												(step === 2) ?
													<>
														<div className="kasko-car-select__controls--group-w text_left">
															<Tooltip overlayClassName="tooltip_v1" placement="bottomLeft"
																	 title="Отменить операцию и вернуться к расчету">
																<Link to="/" className={"ant-btn btn_green "}>Вернуться к расчету</Link>
															</Tooltip>
														</div>
														
														{
															this.state.SMSSent ?
																<>
																	<div className="kasko-car-select__controls--group-w text_center">
																		<div className="offer-select__sms">
																			<Input className={"ant-input w_100p" + (this.state.SMSCode.length ? "" : " _empty")}
																				onChange={this.onSMSCodeChange}
																				defaultValue=""/>
																			<div className="float_placeholder">Код подтверждения</div>
																			<div className="gl_link"
																				 onClick={this.toggleSMSSent}>Отправить код повторно</div>
																		</div>
																	</div>
																	<div className="kasko-car-select__controls--group-w text_left">
																		<p>
																			Попросите клиента продиктовать код, <br />
																			который был отправлен ему <br/>
																			на мобильный телефон
																		</p>
																	</div>
																</>
																:
																<>
																	<div
																		className="kasko-car-select__controls--group-w text_center">
																		<Button htmlType="submit"
																				className={"ant-btn-primary btn_middle"}
																				onClick={this.toggleSMSSent}>Оплатить в кассу</Button>
																	</div>
																	<div
																		className="kasko-car-select__controls--group-w text_right">
																		<div className={"gl_link"}>Отправить ссылку повторно</div>
																	</div>
																</>
														}
													</>
												: this.state.showPayment ?
													<div className="kasko-car-select__controls--group payment">
														{/*<div className="kasko-car-select__controls--group-l">*/}
														{/*	<Link to="/" className={"gl_link color_black"}>Сохранить&nbsp;расчет</Link>*/}
														{/*</div>*/}
														<a href={this.state.availablePayment ? "/payment" : "#"} className={"ant-btn ant-btn-primary btn_middle" + ((this.state.availablePayment) ? "" : " disabled")}>{this.state.showCompare ? 'Сравнить' : 'Оплатить в кассу'}</a>
														<div className="kasko-car-select__controls--group-r">
															<PaymentSwitch allowPayment={this.state.availablePayment} paymentStep={0}/>
															{/*<Link to="/" className={"gl_link"}>Сравнить</Link>*/}
														</div>
													</div>
													:
													<div className="kasko-car-select__controls--group">
														{/*<div className="kasko-car-select__controls--group-l">*/}
														{/*	<Link to="/" className={"gl_link color_black"}>Сохранить&nbsp;расчет</Link>*/}
														{/*</div>*/}
														<Button htmlType="submit" className={"ant-btn-primary btn_wide"}
																onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
														{/*<div className="kasko-car-select__controls--group-r">*/}
														{/*	<Link to="/" className={"gl_link"}>Сравнить</Link>*/}
														{/*</div>*/}
													</div>
											}
											
										</div>
									</>
								: ""
							}
						</>
					}
				</div>
				
				<div ref={(el) => { this.messagesEnd = el }}/>
				
				{this.state.calculationPopupOpened ? 
					<CalculationPopup updatePaymentState={this.updatePaymentState} step={this.state.showCalculationOffers ? 2 : step} allFields={this.state.showCalculationOffers || (step === 2)} fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation} popupCloseFunc={this.toggleCalculationPopup} />
					: ""}
			</>
		);
	}
}

export default OfferSelect;
