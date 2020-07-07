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
import KaskoPopup from "../kasko-popup";
import PopupOverlay from "../popup-overlay";
import CalcsavePopup from "../calcsave-popup";
import KaskoCarSelect from "../kasko-car-select";
import KaskotaxPopup from "../kaskotax-popup";
import CreditPopup from "../credit-popup";
import FormInput from "../form-input";
import KaskotaxForm from "../kaskotax-form";
import FormSwitch from "../form-switch";
import CreditProgrammes from "../credit-programmes";
import CalculationOffers from "../calculation-offers";

const {Option} = Select;
//const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class TabCredit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOffers: [],
			showCarOptions: false,
			activeKasko: this.props.kasko,
			openParams: true,
			paramsChanged: true,
			showMoreParams: false,
			showCreditOffers: false,
			saveCalculationPopupOpened: false,
			calculationPopupOpened: false,
			calculationPopupKasko: false,
			KaskoTaxPopup: false,
			carPrice: this.props.carPrice,
			creditValue: formatMoney(this.props.carPrice / 2) + " ₽",
			creditPercent: "50 %",
			selectedOffers: []
		};
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		imageCallback: PropTypes.func,
		showKaskoWidget: PropTypes.func,
		tabCallback: PropTypes.func,
		step: PropTypes.number
	};

	onCreditChange = (credit) => {
		this.setState({
			creditValue: formatMoney(credit * this.props.carPrice / 100) + " ₽",
			creditPercent: credit + " %"
		});
	};

	updateTab = (index) => {
		this.props.tabCallback && typeof this.props.tabCallback === 'function' && this.props.tabCallback({tabIndex: index})
	};

	toggleCarOptions = () => {
		console.log('toggleCarOptions');
		this.setState({showCarOptions: !this.state.showCarOptions})
	}

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

	toggleSaveCalculationPopup = () => {
		this.setState({saveCalculationPopupOpened: !this.state.saveCalculationPopupOpened})

		document.body.classList.toggle('no-overflow', !this.state.saveCalculationPopupOpened)

		setTimeout(()=> {
			if (!this.state.saveCalculationPopupOpened) {
				window.location = '/orders'
			}
		}, 0)
	}

	toggleCalculationPopup = () => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}

	toggleKaskoPopup = () => {
		let wdgt = {show: true}
		
		if (this.state.calculationPopupKasko) {
			wdgt.step = 2
		}
		
		this.setState({calculationPopupKasko: !this.state.calculationPopupKasko, activeKasko: !!wdgt.step})
		typeof this.props.showKaskoWidget === 'function' && this.props.showKaskoWidget(wdgt)
		
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupKasko)
	}

	toggleKaskoTaxPopup = () => {
		this.setState({KaskoTaxPopup: !this.state.KaskoTaxPopup})
		document.body.classList.toggle('no-overflow', !this.state.KaskoTaxPopup)
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

	updateKaskoState = (value) => {
		console.log('toggleKaskoPopup');

		typeof this.props.showKaskoWidget === 'function' && this.props.showKaskoWidget({show: true, step: 2})

		this.toggleKaskoPopup()
	}
	
	updateKaskoTaxState = (value) => {
		console.log('updateKaskoTaxState');

		typeof this.props.showKaskoWidget === 'function' && this.props.showKaskoWidget({show: true, step: 2})

		this.toggleKaskoTaxPopup()
	}
	
	creditPopupCallback = (e) => {
		console.log('creditPopupCallback', e);
		this.toggleCalculationPopup()
		
		if (e) {
			this.props.tabCallback && typeof this.props.tabCallback === 'function' && this.props.tabCallback({newStep: 2})
		}
	};
	
	updatePaymentState = (value) => {
		if (this.state.showCalculationOffers) {
			this.setState({
				showPayment: value
			})
		}

		if (this.props.osago) {
			this.setState({
				activeOffers: [1]
			})
		}

		this.toggleCalculationPopup()
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
		const {allFields, step, hideOffers, kasko} = this.props;
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
				link: true,
				price: 'Показать'
			},
			{
				option: 'Стоимость кредита',
				price: '622 050 ₽'
			},
			{
				option: 'Остаточный платеж',
				link: true,
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
				link: true,
				price: '15 000 ₽'
			},
			{
				option: 'Доп. услуги банка',
				link: true,
				price: '12 345 ₽'
			},
			{
				option: 'КАСКО',
				func: this.toggleKaskoTaxPopup,
				price: '30 000 ₽'
			},
			{
				option: 'СЖ',
				link: true,
				price: '20 000 ₽'
			},
			{
				option: 'GAP',
				link: true,
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
		
		let creditProducts = [
			{
				option: 'КАСКО',
				price: 50000
			},
			{
				option: 'СЖ',
				price: 0
			},
			{
				option: 'GAP',
				price: 45000
			},
			{
				option: 'Доп. услуги',
				price: 25000
			}
		]
		
		let creditOffersList = [
			{
				name: 'ЮниКредит Банк',
				offers: [
					{
						programme: 'Стандарт (СЖ дилера)',
						price: 23719,
						rate: '15,90%',
						dealerFee: 4145,
						status: 'green',
						products: creditProducts,
						options: optionsFixtures
					}
				]
			},
			{
				name: 'ВТБ',
				offers: [
					{
						programme: 'АвтоСтандарт (СЖ дилера)',
						price: 23719,
						rate: '15,90%',
						dealerFee: 3045,
						status: 'blue',
						products: creditProducts,
						options: optionsFixtures
					}
				]
			}
		]
		
		let offersList = []

		for (let i = 0; i < banks.length; i++) {
			offersList.push({
				name: banks[i],
				//info: (i < 2),
				offers: credOffers
			})
		}
		
		let offers = <>
			<div className={"kasko-car-select__caption fz_12"}>Срок действия, месяцы</div>

			<div className="kasko-car-select__controls radio_v3">
				<Radio.Group defaultValue={periodOptions[4]} style={{width: '100%'}}>
					<Row gutter={20}>
						{periodOptions.map((c, i) =>
							<Col key={i}>
								<Radio value={c}>
									<span
										className={"kasko-car-select__period--value" + (i === periodOptions.length - 1 ? " small" : "")}>{c}</span>
									{i === periodOptions.length - 1 ? "" :
										<span className="kasko-car-select__period--label">13 450 ₽</span>}
								</Radio>
							</Col>
						)
						}
					</Row>
				</Radio.Group>
			</div>

			<div className={"kasko-car-select__controls ant-row-center" + (this.state.openParams ? " mb_0" : "")}>
				<div onClick={this.toggleCalculationOffers}
					 className={"ant-btn ant-btn-primary btn_middle margin" + (this.state.paramsChanged ? "" : " disabled")}
				>Получить расчет
				</div>
			</div>
		</>
		
		let creditOffersComponent = <KaskoOffers onOfferSelect={this.offersUpdate} offerItemCallback={this}
												 active={[0, 1, 2, 3, 4, 5]} slider={true} credit={true} offersList={[
			{
				name: 'КАСКО',
				//button: 'Рассчитать',
				//func: this.toggleKaskoPopup,
				collapse: true,
				dropdown: 'KaskotaxPopup',
				dropdownCallback: (action) => {
					console.log('dropdownCallback КАСКО', action);

					if ('setTab' in action) {
						this.updateTab(action.setTab)
					}
					
					if ('creditAdd' in action) {
						this.updateTab(action.setTab)
						
					}
				},
				price: this.state.activeKasko ? '41450' : '15400',
				prefix: this.state.activeKasko ? '' : 'от',
				suffix: '₽'
			},
			{
				name: 'GAP',
				price: '5400',
				prefix: 'от',
				suffix: '₽'
			},
			{
				name: 'Страхование жизни',
				price: '5401',
				prefix: 'от',
				suffix: '₽'
			},
			{
				name: 'Продленная гарантия',
				price: '5402',
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
				name: 'Шоколад',
				price: '15400',
				prefix: 'от',
				suffix: '₽'
			}
		]}/>
		
		return (
			<div className="kasko-car-select">
				{step >= 2 ? null : creditOffersComponent}

				<div onClick={this.toggleShowParams} className={"kasko-car-select__caption" + (this.state.openParams ? " expanded" : " collapsed")}>
					{step >= 2 ? 'Кредитный калькулятор' : 'Параметры кредита'}
				</div>

				{
					this.state.openParams ?
						<>
							{step >= 2 ? creditOffersComponent : null}
							
							<div className="kasko-car-select__caption mt_30 fz_12">Первоначальный взнос</div>
							<Row className={"kasko-car-select__controls car-credit mb_30"} gutter={20}>
								<FormInput span={5} onChangeCallback={this.formControlCallback}
										   className="text_right"
										   controlName="creditValue"
										   value={this.state.creditValue}/>
										   
								<FormInput span={3} onChangeCallback={this.formControlCallback}
										   className="text_center"
										   controlName="creditPercent"
										   value={this.state.creditPercent}/>
							</Row>
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
															<Col key={i} span={24} />
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
							
							{step >= 2 ? offers : null}
						</>
					: null
				}

				{step >= 2 ? null : offers}
				
				{step >= 2 ?
					<>
						<CreditProgrammes headMenu={this.state.selectedOffers.length} selectedOffer={this.updateSelectedOffer} offersList={creditOffersList} allowCheck={true} />

						<Row gutter={20} className={"kasko-car-select__controls ant-row-center align_center"}>
							<Col span={6}>
								<Button disabled={this.state.selectedOffers.length ? null : "disabled"}
										className={"ant-btn-primary btn_middle ant-btn-block"}
										onClick={() => {this.props.tabCallback({newStep: 3})}}>Оформить кредит</Button>
							</Col>
						</Row>
					</>
					: this.state.showCreditOffers ? 
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

								<Row gutter={20} className={"kasko-car-select__controls ant-row-center align_center"} style={{marginBottom: '50px'}}>
									<Col span={6}>
										<div onClick={this.toggleSaveCalculationPopup} className={"ant-btn btn_green ant-btn-block"}>Сохранить расчет</div>
									</Col>
									
									<Col span={12}>
										<Button htmlType="submit"
												style={{padding: '0 50px'}}
												className={"ant-btn-primary btn_middle ant-btn-block"}
												onClick={this.toggleCalculationPopup}>Заполнить анкету и отправить в банк</Button>
									</Col>

									<Col span={6}>
										<div className="car-credit__print">
											<a className="gl_link color_black" href="#">Кредитный расчет</a>
											<a className="gl_link color_black" href="#">График платежей</a>
											<a className="gl_link" href="#">PDF в DOC</a>
										</div>
									</Col>
									{/*<div className="kasko-car-select__controls--group text_center">*/}
									{/*	<div className="kasko-car-select__controls--group-r">*/}
									{/*		*/}
									{/*	</div>*/}
									{/*</div>*/}
								</Row>
							</Col>
						</Row>
					</div>
					: null
				}
				
				<div ref={(el) => { this.messagesEnd = el }}/>
				
				{this.state.calculationPopupOpened ?
					<PopupOverlay span={16}>
						<CreditPopup popupCallback={this.creditPopupCallback} updatePaymentState={this.updatePaymentState} step={this.state.showCalculationOffers ? 2 : step} allFields={this.state.showCalculationOffers || (step === 2)} fullCalculation={true} popupCloseFunc={this.toggleCalculationPopup} />
					</PopupOverlay>
					: null
				}
					
				{this.state.calculationPopupKasko ?
					<PopupOverlay span={16}>
						<KaskoPopup updatePaymentState={this.updateKaskoState} popupCloseFunc={this.toggleKaskoPopup} />
					</PopupOverlay>
					: null
				}
					
				{this.state.KaskoTaxPopup ?
					<PopupOverlay span={8}>
						<KaskotaxPopup updatePaymentState={this.updateKaskoTaxState} popupCloseFunc={this.toggleKaskoTaxPopup} />
					</PopupOverlay>
					: null
				}

				{this.state.saveCalculationPopupOpened ?
					<PopupOverlay span={12}>
						<CalcsavePopup popupCloseFunc={this.toggleSaveCalculationPopup}/>
					</PopupOverlay>
					: null
				}
			</div>
		);
	}
}

export default TabCredit;
