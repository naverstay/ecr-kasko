import React, {Component} from "react";
import {Col, Row, Button, Radio, Slider} from "antd";
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

moment().locale('ru', ru);

class OfferSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: false,
			showCalculationOffers: false,
			calculationPopupOpened: false,
			formBusy: false,
			hasFranchise: false,
			carCredit: true,
			carMark: '',
			carPrice: 0,
			carModel: '',
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
			showPayment: false,
			paramsChanged: false,
			activeOffers: false
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
	
	onCalculationTypeChange = (checked) => {
		this.setState({
			fullCalculation: checked
		})
	}
	
	toggleCalculationPopup = (checked) => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}

	getEmptyFields = () => {
		return this.state.fullCalculation ? 10 : 20
	}

	offersUpdate = (offer) => {
		this.setState({
			activeOffers: offer.active,
			paramsChanged: true
		});
	};

	toggleCalculationOffers = e => {
		if (this.state.activeOffers && this.state.paramsChanged) {
			this.setState({
				showCalculationOffers: !this.state.showCalculationOffers,
				paramsChanged: false
			});
		}
	};
	
	onDamagesChange = (checkedValues) => {
		console.log('checked = ', checkedValues);

		this.setState({
			paramsChanged: true
		})
	}
	
	onPeriodChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
		
		this.setState({
			paramsChanged: true
		})
	}

	onOtherChange = (checkedValues) => {
		console.log('checked = ', checkedValues);

		this.setState({
			paramsChanged: true
		})
	}
	
	onFranchiseChange = e => {
		this.setState({
			paramsChanged: true,
			hasFranchise: !!e.target.value,
		});
	};
	
	onFranchiseValueChange = e => {
		//console.log('onFranchiseValueChange', e);
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

		const periodPlurals = ['мксяц', 'мксяца', 'мксяцев'];
		const periodOptions = [12, 9, 6, 3];
		const damageOptions = ['Ущерб', 'Полная гибель', 'Угон'];
		const otherOptions = ['Мультидрайв'];

		const franchise = this.state.franchise
		
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
		
		franchise.forEach((f, i) => {
			const index = i === 0 ? 0 : i === franchise.length - 1 ? 100 : parseInt(i * (100 / ((franchise.length - 1) || 1)))

			franchiseSteps[index] = {
				label: <span className={"kasko-car-select__franchise--label" + (index === 0 || index === 100 ? " extremum" : "")}>{formatMoney(f)}</span>,
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
									logo: 'ingosstrakh.png',
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
			
							<div className="kasko-car-select__controls ant-row-center">
								<Button htmlType="submit" className={"btn_green btn_wide"} onClick={this.toggleCalculationPopup}>
									Для расчета заполните {this.getEmptyFields()} полей
								</Button>
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
											<Radio value={1}>С франшизой</Radio>
										</Col>
										
										{ this.state.hasFranchise ?
											<>
												<Col className={"check_v3 checkbox_franchise"}>
													<Checkbox>Со второго случая</Checkbox>
												</Col>
												<Col className={"kasko-car-select__controls--flex-1"}>
													<Slider className="kasko-car-select__franchise" tooltipVisible={false}
															tipFormatter={this.onFranchiseTooltip}
															onAfterChange={this.onFranchiseValueChange} marks={franchiseSteps}
															defaultValue={franchiseSteps[2]}/>
												</Col>
											</>
											: ""
										}
									</Row>
								</Radio.Group>
							</div>
			
							<div className="kasko-car-select__controls check_v2">
								<Checkbox.Group defaultValue={'012'} style={{width: '100%'}} onChange={this.onDamagesChange}>
									<Row gutter={20}>
										{
											damageOptions.map((c, i) => <Col key={i}>
															<Checkbox checked="checked" value={i}><span className="test123">{c}</span></Checkbox>
														</Col>
											)
										}
									</Row>
								</Checkbox.Group>
								
								<div className="kasko-offer__more"><div className="gl_link">Показать еще</div></div>
							</div>
							
							<div className="kasko-car-select__controls check_v1">
								<Checkbox.Group defaultValue={'0'} style={{width: '100%'}} onChange={this.onPeriodChange}>
									<Row gutter={20}>
										{
											periodOptions.map((c, i) => <Col key={i}>
													<Checkbox checked="checked" value={i}>
														<span className="kasko-car-select__period--value">{c}</span>
														<span className="kasko-car-select__period--label">{pluralFromArray(periodPlurals, c)}</span>
													</Checkbox>
												</Col>
											)
										}
									</Row>
								</Checkbox.Group>
							</div>
			
							<div className="kasko-car-select__controls check_v2">
								<Checkbox.Group options={otherOptions} onChange={this.onOtherChange}/>
							</div>
			
							<div className="kasko-car-select__controls ant-row-center">
								<div onClick={this.toggleCalculationOffers} className={"ant-btn btn_green btn_middle" + ((this.state.activeOffers && this.state.paramsChanged) ? "" : " disabled")}>
									Получить расчет
								</div>
							</div>
							
							{this.state.showCalculationOffers ?
									<>
										<CalculationOffers selectedOffer={this.updateSelectedOffer} offersList={[
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
										]}/>
		
										<div className="kasko-car-select__controls ant-row-center">
											{
												this.state.showPayment ?
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
														<Button htmlType="submit" className={"btn_green btn_middle"}
																onClick={this.toggleCalculationPopup}>Для окончательного расчета
															заполните {this.getEmptyFields()} полей</Button>
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
					<CalculationPopup fullCalculation={this.state.fullCalculation} popupCloseFunc={this.toggleCalculationPopup} />
					: ""}
			</>
		);
	}
}

export default OfferSelect;
