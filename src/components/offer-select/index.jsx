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
import CalculationOffers from "../calculation-offers";


moment().locale('ru', ru);

class OfferSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: false,
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
			]
		};
	}

	static propTypes = {
		children: PropTypes.node,
		type: PropTypes.string,
		innerWidth: PropTypes.number
	};

	formRef = React.createRef();
	
	onCarYearChange = e => {
		this.setState({carYear: e})
	};

	onCarNumberChange = e => {
		this.setState({carNumber: e.target.value, carFound: void 0})
	};
	
	onCalculationTypeChange = (checked) => {
		this.setState({fullCalculation: checked})
	}
	
	toggleCalculationPopup = (checked) => {
		this.setState({calculationPopupOpened: !this.state.calculationPopupOpened})
		document.body.classList.toggle('no-overflow', !this.state.calculationPopupOpened)
	}
	
	onMarkChange = value => {
		this.setState({carMark: value})
	};

	onModelChange = value => {
		this.setState({carModel: value})
	};

	onEquipmentChange = value => {
		this.setState({carEquipment: value})
	};

	onFinish = values => {
		this.setState({formBusy: true})
		
		setTimeout(() => {
			this.setState({formBusy: false, carFound: (Math.random() * 10) > 5})
			
			if (this.state.carFound) {
				this.setState({
					carMark: 'Mercedes-Benz',
					carModel: 'GT S Sports Car',
					carEquipment: 'GT S Sports Car',
					carNumber: 'А 123 АА 177',
					carPrice: 14800000,
					carYear: moment('2015')
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
	
	onDamagesChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}
	
	onPeriodChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}

	onOtherChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}
	
	onFranchiseChange = e => {
		this.setState({
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
			carCredit: !!e.target.value
		});
	};

	updateFranchiseExtremum (min, max) {
		//this.setState({updateFranchiseExtremum: [min, max]})
	}

	render() {
		const {image} = this.props;

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

		this.updateFranchiseExtremum([franchise[0], franchise[franchise.length - 1]])
		
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
	
					<div className={"kasko-car-select__calculation" + (this.state.fullCalculation ? ' active' : '')}>
						<span className="kasko-car-select__calculation--text">Предварительный расчет</span>
						<Switch className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
						<span className="kasko-car-select__calculation--text">Окончательный расчет</span>
					</div>
	
					<div className="kasko-car-select__controls ant-row-center">
						<Button htmlType="submit" className={"btn_green btn_wide"} onClick={this.toggleCalculationPopup}>
							Для расчета заполните 20 полей
						</Button>
					</div>
	
					<div className="kasko-car-select__caption">
						Добавить в КАСКО
					</div>
					
					<div className="kasko-car-select__carousel">
						<KaskoOffers slider={true} offersList={[
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
						<Checkbox.Group  options={damageOptions} onChange={this.onDamagesChange}/>
	
						<div className="kasko-offer__more"><div className="gl_link">Показать еще</div></div>
					</div>
					
					<div className="kasko-car-select__controls check_v1">
						<div className="ant-checkbox-group">
							<label className="ant-checkbox-group-item ant-checkbox-wrapper">
								<span className="ant-checkbox">
									<input type="checkbox" className="ant-checkbox-input" value="12" />
									<span className="ant-checkbox-inner"></span>
								</span>
								<span>
									<span className="kasko-car-select__period--value">12</span>
									<span className="kasko-car-select__period--label">месяцев</span>
								</span>
							</label>
							
							<label className="ant-checkbox-group-item ant-checkbox-wrapper">
								<span className="ant-checkbox"><input type="checkbox" className="ant-checkbox-input" value="9" />
									<span className="ant-checkbox-inner"></span>
								</span>
								<span>
									<span className="kasko-car-select__period--value">9</span>
									<span className="kasko-car-select__period--label">месяцев</span>
								</span>
							</label>
							
							<label className="ant-checkbox-group-item ant-checkbox-wrapper">
								<span className="ant-checkbox"><input type="checkbox" className="ant-checkbox-input" value="6" />
									<span className="ant-checkbox-inner"></span>
								</span>
								<span>
									<span className="kasko-car-select__period--value">6</span>
									<span className="kasko-car-select__period--label">месяцев</span>
								</span>
							</label>
							
							<label className="ant-checkbox-group-item ant-checkbox-wrapper">
								<span className="ant-checkbox"><input type="checkbox" className="ant-checkbox-input" value="3" />
									<span className="ant-checkbox-inner"></span>
								</span>
								<span>
									<span className="kasko-car-select__period--value">3</span>
									<span className="kasko-car-select__period--label">месяца</span>
								</span>
							</label>
						</div>
						
					</div>
	
					<div className="kasko-car-select__controls check_v2">
						<Checkbox.Group  options={otherOptions} onChange={this.onOtherChange}/>
					</div>
	
					<div className="kasko-car-select__controls ant-row-center">
						<Link to="/" className={"ant-btn btn_green btn_middle"}>
							Получить расчет
						</Link>
					</div>
					
					<CalculationOffers offersList={[
						{
							logo: 'ingosstrakh.png',
							offers: [
								{
									name: 'Обычный',
									price: 41450,
									dealerFee: 4145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Обычный 2',
									price: 51450,
									dealerFee: 5145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Обычный 3',
									price: 61450,
									dealerFee: 6145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Обычный 4',
									price: 11450,
									dealerFee: 1145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Обычный 5',
									price: 21450,
									dealerFee: 2145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Обычный 6',
									price: 31450,
									dealerFee: 3145,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
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
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Необычный 2',
									price: 30450,
									dealerFee: 3045,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								},
								{
									name: 'Необычный 3',
									price: 30450,
									dealerFee: 3045,
									options: [
										'Территория страхования: РФ + СНГ',
										'Повреждение отскочившим или упавшим ',
										'Сбор справок',
										'предметом',
										'Эвакуатор',
										'Стихийное бедствие',
										'Круглосуточная консультация',
										'Противоправные действия третьих лиц',
										'Сбор справок',
										'Действия животных',
										'Несчастный случай: 300 000  ₽',
										'Провал под грунт',
										'ДТП',
										'Техногенная авария',
										'Пожар',
										'Подтопление'
									]
								}
							]
						}
					]} />
					
				</div>
		
				{this.state.calculationPopupOpened ? 
					<CalculationPopup popupCloseFunc={this.toggleCalculationPopup} />
					: ""}
			</>
		);
	}
}

export default OfferSelect;
