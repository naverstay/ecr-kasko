import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, Checkbox, Form, Radio, Slider, Tooltip} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";
import {Link} from "react-router-dom";
import CreditSlider from "../credit-slider";
import CreditOffers from "../credit-offers";
import CreditAdditionals from "../credit-additionals";
import PaymentSwitch from "../payment-switch";
import Osago from "../../pages/osago";
import CalculationPopup from "../calculation-popup";

const {Option} = Select;
//const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class CarCredit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOffers: [],
			openParams: true,
			paramsChanged: true,
			showMoreParams: false,
			showCreditOffers: false,
			carPrice: this.props.carPrice,
			creditValue: formatMoney(this.props.carPrice / 2) + " ₽",
			creditPercent: "50 %"
		};
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		imageCallback: PropTypes.func,
		step: PropTypes.number
	};

	onCreditChange = (credit) => {
		this.setState({
			creditValue: formatMoney(credit * this.props.carPrice / 100) + " ₽",
			creditPercent: credit + " %"
		});
	};

	toggleShowParams = () => {
		this.setState({
			openParams: !this.state.openParams
		});
	};
	
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

	onShowMoreParamsChange = (checkedValues) => {
		this.setState({
			showMoreParams: !this.state.showMoreParams
		})
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({behavior: "smooth"});
	}
	
	toggleCalculationOffers = e => {
		//if (this.state.activeOffers.length && this.state.paramsChanged) {
			this.setState({
				showCreditOffers: true,
				openParams: false,
				//paramsChanged: false
			});
		//}

		setTimeout(() => {
			this.scrollToBottom();
		}, 100)
	};

	toggleCalculationPopup = () => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}
	
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
	
		let creditOptions = [
			'Все типы кредитов',
			'Программа производителя',
			'Без остаточной стоимости',
			'Лояльный клиент',
			'Неработающий пенсионер',
			'Автомобиль в трейд-ин',
			'С остаточной стоимостью',
			'Копия ПТС',
			'',
			'Первый автомобиль',
			'Семейный автомобиль'
		]
		
		let periodOptions = [12,24,36,48,60,72,80,'Все\nсроки']

		let credOffers = []

		const optionsFixtures = [
			{
				option: 'Доход дилера',
				price: 'Показать'
			},
			{
				option: 'Стоимость кредита',
				price: '622 050 ₽'
			},
			{
				option: 'Остаточный платеж',
				price: '478 500 ₽'
			},
			{
				option: 'Переплата',
				price: '87 623 ₽'
			},
			{
				option: '',
				price: ''
			},
			{
				option: 'Доп. услуги дилера',
				price: '—'
			},
			{
				option: 'Доп. услуги банка',
				price: '—'
			},
			{
				option: 'КАСКО',
				price: '—'
			},
			{
				option: 'СЖ',
				price: '—'
			},
			{
				option: 'GAP',
				price: '23 279 ₽'
			},
		]
		
		let banks = ['Русфинанс Банк', 'ВТБ', 'Кредит Европа банк', 'Московский Кредитный Банк', 'Сетелем', 'Сетелем', 'Сетелем', 'Сетелем', 'Сетелем', 'Сетелем']
		
		for (let i = 0; i < 10; i++) {
			credOffers.push({
				name: 'Hyundai Finance. Старт 20/70',
				price: 130450,
				rate: '13,5%',
				dealerFee: 65000,
				params: ['2 документа', 'КАСКО дилера'],
				options: optionsFixtures
			})
		}
		
		let offersList = []

		for (let i = 0; i < banks.length; i++) {
			offersList.push({
				name: banks[i],
				//info: (i < 2),
				offers: credOffers
			})
		}
		
		return (
			<div className="kasko-car-select">
				<h1 className="kasko-main__title">Рассчитать кредит</h1>

				<div className="kasko-car-select__controls">
					<Link className="gl_link color_black" to="/kasko">Автомобиль</Link>
				</div>
				
				<div className="credit-slider__wrapper">
					<Row className="kasko-car-select__controls car-credit" gutter={20}>
						<Col span={12}>
							<div className="car-credit__initial-fee">
								<p>Первоначальный взнос</p>
								<Input
									value={this.state.creditValue}
									defaultValue=""/>
							</div>
						</Col>
						<Col span={12}>
							<div className="car-credit__percent">
								<p>&nbsp;</p>
								<Input
									value={this.state.creditPercent}
									defaultValue=""/>
							</div>
						</Col>
					</Row>
					
					<CreditSlider onSliderChange={this.onCreditChange} creditMax={100} creditMin={0} image={image}/>
				</div>

				<div className="kasko-car-select__caption">Добавить в кредит</div>
				
				<div className="kasko-car-select__carousel">
					<KaskoOffers onOfferSelect={this.offersUpdate} active={[]} slider={true} credit={true} offersList={[
						{
							name: 'КАСКО',
							button: 'Рассчитать',
							href: '/kasko',
							price: '15400',
							prefix: 'от',
							suffix: '₽'
						},
						{
							name: 'ОСАГО',
							price: '5400',
							prefix: 'от',
							suffix: '₽'
						},
						{
							name: 'КАСКО',
							price: '5400',
							prefix: 'от',
							suffix: '₽'
						},
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
							name: 'GAP',
							price: '15400',
							prefix: 'от',
							suffix: '₽'
						},
						{
							name: 'СЖ',
							price: '5400',
							prefix: 'от',
							suffix: '₽'
						}
					]}/>
				</div>

				<div onClick={this.toggleShowParams} className={"kasko-car-select__caption" + (this.state.openParams ? " expanded" : " collapsed")}>Параметры кредита</div>

				{
					this.state.openParams ?
						<>
							<div className="kasko-car-select__controls radio_v2 wide_group">
								<Radio.Group defaultValue={0}>
									<Row gutter={20}>
										<Col>
											<Radio value={0}>2 документа</Radio>
										</Col>
										<Col>
											<Radio value={1}>Полный пакет</Radio>
										</Col>
									</Row>
								</Radio.Group>
							</div>

							<div className="kasko-car-select__controls check_v2 mb_10">
								<Checkbox.Group defaultValue={'0'}>
									<Row gutter={20}>
										{
											<>
												{
													creditOptions.slice(0, (this.state.showMoreParams ? creditOptions.length : 3)).map((c, i) =>
														c ?
															<Col key={i}>
																<Checkbox value={i}>{c}</Checkbox>
															</Col>
														:
															<Col span={24} />
													)
												}
												<Col>
													<div className="kasko-offer__more">
														<div onClick={this.onShowMoreParamsChange}
															 className="gl_link">{this.state.showMoreParams ? "Скрыть" : "Показать еще"}</div>
													</div>
												</Col>
											</>
										}
									</Row>
								</Checkbox.Group>
							</div>
						</>
					: ""
				}

				<div className={"kasko-car-select__caption fz_12"}>Срок действия, месяцы</div>

				<div className="kasko-car-select__controls radio_v3">
					<Radio.Group defaultValue={periodOptions[4]} style={{width: '100%'}}>
						<Row gutter={20}>
							{periodOptions.map((c, i) => <Col key={i}>
										<Radio value={c}>
											<span className={"kasko-car-select__period--value" + (i === periodOptions.length - 1 ? " small" : "")}>{c}</span>
											{i === periodOptions.length - 1 ? "" : <span className="kasko-car-select__period--label">13 450 ₽</span>}
										</Radio>
									</Col>
								)
							}
						</Row>
					</Radio.Group>
				</div>
				
				<div className={"kasko-car-select__controls ant-row-center" + (this.state.openParams ? " mb_0" : "")}>
					{this.state.openParams ? <div onClick={this.toggleCalculationOffers}
						 className={"ant-btn ant-btn-primary btn_middle margin" + (this.state.paramsChanged ? "" : " disabled")}>Получить расчет</div> : ""}
				</div>
				
				{this.state.showCreditOffers ? 
					<div className="kasko-main__wide">
						<Row gutter={20}>
							<Col span={4}>
								{/*<div className="kasko-car-select__caption text_center">Добавлено в кредит</div>*/}
								{/*<CreditAdditionals additionalList={[*/}
								{/*	{*/}
								{/*		title: 'КАСКО дилера',*/}
								{/*		additionals: [*/}
								{/*			{*/}
								{/*				option: 'Зетта-Страхование'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: '123 456 ₽'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: 'В кредит / 1 год'*/}
								{/*			},*/}
								{/*		]*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: 'GAP дилера',*/}
								{/*		additionals: [*/}
								{/*			{*/}
								{/*				option: 'Зетта-Страхование'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: '123 456 ₽'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: 'На весь срок'*/}
								{/*			},*/}
								{/*		]*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: 'СЖ дилера',*/}
								{/*		additionals: [*/}
								{/*			{*/}
								{/*				option: 'Зетта-Страхование'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: '123 456 ₽'*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: 'На весь срок'*/}
								{/*			},*/}
								{/*		]*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: 'Услуги дилера',*/}
								{/*		additionals: [*/}
								{/*			{*/}
								{/*				option: 'Карта РАТ',*/}
								{/*				short: true*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: '5 000 ₽',*/}
								{/*				short: true*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: 'Вручную',*/}
								{/*				short: true*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: '15 000 ₽',*/}
								{/*				short: true*/}
								{/*			},*/}
								{/*			{*/}
								{/*				option: 'В кредит'*/}
								{/*			}*/}
								{/*		]*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: 'Шоколад',*/}
								{/*		additionals: [*/}
								{/*			{*/}
								{/*				option: '123 456 ₽'*/}
								{/*			},*/}
								{/*		]*/}
								{/*	}*/}
								{/*]} />*/}
								{/*<div className="kasko-car-select__caption text_center">Параметры кредита</div>*/}
								{/*<CreditAdditionals additionalList={[*/}
								{/*	{*/}
								{/*		title: '2 документа'*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: 'Все типы кредитов'*/}
								{/*	},*/}
								{/*	{*/}
								{/*		title: '24 месяца'*/}
								{/*	}*/}
								{/*]}/>*/}
							</Col>
							<Col span={16}>
								<CreditOffers completed={true} selectedOffer={this.updateSelectedOffer} offersList={offersList}/>

								<div className={"kasko-car-select__controls ant-row-center align_center"} style={{marginBottom: '50px'}}>
									<div className="kasko-car-select__controls--group text_center">
										<Button htmlType="submit"
												style={{padding: '0 50px'}}
												className={"ant-btn-primary btn_middle"}
												onClick={this.toggleCalculationPopup}>Сохранить расчет и заполнить анкету</Button>
										<div className="kasko-car-select__controls--group-r">
											<div className="car-credit__print">
												<a className="gl_link color_black" href="#">Кредитный расчет</a>
												<a className="gl_link color_black" href="#">График платежей</a>
												<a className="gl_link" href="#">PDF в DOC</a>
											</div>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</div>
					: ""
				}
				
				<div ref={(el) => { this.messagesEnd = el }}/>
				
				{this.state.calculationPopupOpened ? 
					<CalculationPopup updatePaymentState={this.updatePaymentState} step={this.state.showCalculationOffers ? 2 : step} allFields={this.state.showCalculationOffers || (step === 2)} fullCalculation={this.state.showCalculationOffers || this.state.fullCalculation} popupCloseFunc={this.toggleCalculationPopup} />
					: ""}
			</div>
		);
	}
}

export default CarCredit;
