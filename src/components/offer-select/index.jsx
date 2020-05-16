import React, {Component} from "react";
import {Col, Row, Button, Radio, Slider, Input} from "antd";
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
			fullCalculation: false,
			showCalculationOffers: this.props.step > 1,
			SMSSent: false,
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
			showPayment: this.props.step > 1,
			showMoreDamages: false,
			paramsChanged: false,
			activeOffers: this.props.step > 1 ? [1] : []
		};
	}

	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.string,
		innerWidth: PropTypes.number
	};

	updateSelectedOffer = (company, offer) => {
		console.log('updateSelectedOffer', company, offer);

		this.setState({
			showPayment: true
		})
	}

	onSMSCodeChange = e => {
		this.setState({SMSCode: e.target.value})
	};
	
	onCalculationTypeChange = (checked) => {
		this.setState({
			fullCalculation: checked
		})
	}
	
	toggleCalculationPopup = () => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}

	toggleSMSSent = () => {
		this.setState({SMSSent: !this.state.SMSSent})
	}

	calculationButtonText = () => {
		return this.state.fullCalculation ? 'Для окончательного расчетазаполните 10 полей ' : 'Для расчета заполните  20 полей'
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
				showCalculationOffers: !this.state.showCalculationOffers,
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
	
	render() {
		const {image, step} = this.props;

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
				logo: 'ingosstrakh.png',
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
				logo: 'bck.png',
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
					logo: 'ingosstrakh.png',
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
						<img src={image || 'car-1-s.png'} alt=""/>
					</div>
	
					{step === 3 ?
						<>
							<h1 className="kasko-main__title">Полис оплачен</h1>

							<CalculationOffers completed={true} selectedOffer={this.updateSelectedOffer} offersList={[
								{
									logo: 'bck.png',
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
							<div className={"kasko-car-select__calculation" + (this.state.fullCalculation ? ' active' : '')}>
								<span className="kasko-car-select__calculation--text">Предварительный расчет</span>
								<Switch className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
								<span className="kasko-car-select__calculation--text">Окончательный расчет</span>
							</div>
			
							<div className="kasko-car-select__controls ant-row-center mb_45">
								<Button htmlType="submit" className={"btn_green btn_wide"} onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
							</div>
			
							<div className="kasko-car-select__caption">
								Добавить в КАСКО
							</div>
							
							<div className="kasko-car-select__carousel">
								<KaskoOffers onOfferSelect={this.offersUpdate} slider={true} offersList={[
									{
										name: 'GAP',
										price: 10400,
										prefix: 'от',
										suffix: '₽/мес.'
									},
									{
										name: 'Несчастный случай',
										price: 10410,
										prefix: 'от',
										suffix: '₽.'
									},
									{
										name: 'Аварийный комиссар',
										price: 10420,
										prefix: 'от',
										suffix: '₽.'
									},
									{
										name: 'Стекла без справок',
										price: 10430,
										prefix: 'от',
										suffix: '₽.'
									},
									{
										name: 'ОСАГО',
										price: 10410,
										prefix: 'от',
										suffix: '₽.'
									},
									{
										name: 'Кредит',
										price: 10420,
										prefix: 'от',
										suffix: '₽.'
									},
									{
										name: '123',
										price: 10430,
										prefix: 'от',
										suffix: '₽.'
									}
								]}/>
							</div>
			
							<div className="kasko-car-select__caption">
								Параметры КАСКО
							</div>
							
							<div className="kasko-car-select__controls radio_v2 wide_group">
								<Radio.Group defaultValue={this.state.hasFranchise ? 1 : 0} onChange={this.onFranchiseChange}>
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
										
										{ this.state.hasFranchise ?
											<Col className={"kasko-car-select__controls--flex-1"}>
												<Slider className="kasko-car-select__franchise"
														step={null}
														tooltipVisible={false}
														tipFormatter={this.onFranchiseTooltip}
														onAfterChange={this.onFranchiseValueChange} marks={franchiseSteps}
														defaultValue={franchiseSteps[2]}/>
											</Col>
											: ""
										}
									</Row>
								</Radio.Group>
							</div>
			
							<div className="kasko-car-select__controls check_v2">
								<Checkbox.Group defaultValue={damageOptions.map((o, i) => i)} onChange={this.onDamagesChange}>
									<Row gutter={20}>
										{
											<>
												{ 
													damageOptions.slice(0, (this.state.showMoreDamages ? damageOptions.length : 3)).map((c, i) => <Col key={i}>
															<Checkbox value={i}>{c}</Checkbox>
														</Col>
													)
												}
												<Col>
													<div className="kasko-offer__more">
														<div onClick={this.onShowMoreDamagesChange} className="gl_link">{this.state.showMoreDamages ? "Скрыть" : "Показать еще"}</div>
													</div>
												</Col>
											</>
										}
									</Row>
								</Checkbox.Group>
							</div>
							
							<div className="kasko-car-select__controls radio_v3">
								<Radio.Group defaultValue={periodOptions[0]} style={{width: '100%'}} onChange={this.onPeriodChange}>
									<Row gutter={20}>
										{
											periodOptions.map((c, i) => <Col key={i}>
													<Radio value={c}>
														<span className="kasko-car-select__period--value">{c}</span>
														<span className="kasko-car-select__period--label">{pluralFromArray(periodPlurals, c)}</span>
													</Radio>
												</Col>
											)
										}
									</Row>
								</Radio.Group>
							</div>

							<DriverCount step={step} driverOptions={driverOptions} />
			
							<div className="kasko-car-select__controls ant-row-center">
								<div onClick={this.toggleCalculationOffers} className={"ant-btn btn_green btn_middle margin" + ((this.state.activeOffers.length && this.state.paramsChanged) ? "" : " disabled")}>
									Получить расчет
								</div>
							</div>
							
							{this.state.showCalculationOffers ?
									<>
										<CalculationOffers waiting={step === 2} selectedOffer={this.updateSelectedOffer} offersList={calculationOfferList}/>
		
										<div className={"kasko-car-select__controls ant-row-center align_center"}>
											{
												(step === 2) ?
													<>
														<div className="kasko-car-select__controls--group-w text_left">
															<Link to="/" className={"gl_link color_black"}>
																Отменить операцию и <br />
																вернуться к расчету
															</Link>
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
																				 onClick={this.toggleSMSSent}>
																				Отправить код повторно
																			</div>
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
																				className={"btn_green btn_middle"}
																				onClick={this.toggleSMSSent}>Оплатить в
																			кассу</Button>
																	</div>
																	<div
																		className="kasko-car-select__controls--group-w text_right">
																		<div className={"gl_link"}>
																			Отправить ссылку повторно
																		</div>
																	</div>
																</>
															
														}
													</>
												: this.state.showPayment ?
													<div className="kasko-car-select__controls--group payment">
														<div className="kasko-car-select__controls--group-l">
															<Link to="/" className={"gl_link color_black"}>
																Сохранить&nbsp;расчет
															</Link>
														</div>
														<Button htmlType="submit" className={"btn_green btn_middle"}
																onClick={this.toggleCalculationPopup}>Оплатить в кассу</Button>
														<div className="kasko-car-select__controls--group-r">
															<PaymentSwitch paymentStep={0}/>
															<Link to="/" className={"gl_link"}>
																Сравнить
															</Link>
														</div>
													</div>
													:
													<div className="kasko-car-select__controls--group">
														<div className="kasko-car-select__controls--group-l">
															<Link to="/" className={"gl_link color_black"}>
																Сохранить&nbsp;расчет
															</Link>
														</div>
														<Button htmlType="submit" className={"btn_green btn_wide"}
																onClick={this.toggleCalculationPopup}>{this.calculationButtonText()}</Button>
														<div className="kasko-car-select__controls--group-r">
															<Link to="/" className={"gl_link"}>
																Сравнить
															</Link>
														</div>
													</div>
											}
											
										</div>
									</>
								: ""
							}
						</>
					}
				</div>
				
				{this.state.calculationPopupOpened ? 
					<CalculationPopup step={step} allFields={false} fullCalculation={this.state.fullCalculation} popupCloseFunc={this.toggleCalculationPopup} />
					: ""}
			</>
		);
	}
}

export default OfferSelect;
