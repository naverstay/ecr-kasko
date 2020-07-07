import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form, Checkbox, Select} from "antd";
import FormSwitch from "../form-switch";
import FormSelect from "../form-select";
import FormInput from "../form-input";
import KaskotaxForm from "../kaskotax-form";

const {Option} = Select;

class KaskotaxPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formBusy: false,
			kaskoCash: false,
			kaskoDealerBank: false,
			kaskoFirstYear: false,
			manualPriceCheck: false,
			insurancePrice: '',
			insuranceCompName: '',
			insuranceTaxName: '',
			clientLastName: '',
			clientPhone: '',
			insuranceCompaniesList: [
				'Зетта-Страхование',
				'Бетта-Страхование',
				'Тетта-Страхование',
				'',
				'Внести вручную'
			],
			insuranceTaxList: [
				'КАСКО базовый',
				'КАСКО супер',
				'КАСКО мега'
			]
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		popupCloseFunc: PropTypes.func,
		toggleFunc: PropTypes.func,
		updatePaymentState: PropTypes.func,
		innerWidth: PropTypes.number,
	};

	formRef = React.createRef();

	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		if (name in this.state) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
		} else {
			console.log('no name in state', name);
		}
		
		switch (name) {
			case 'insuranceCompName':
				let manual = value === this.state.insuranceCompaniesList[this.state.insuranceCompaniesList.length - 1]
				
				this.setState({
					insuranceCompName: value,
					insuranceTaxName: manual ? '' : this.state.insuranceTaxName,
					manualPriceCheck: manual
				})
				break
			case 'kaskoCash':
				this.setState({kaskoCash: value})
				break
			case 'kaskoDealerBank':
				this.setState({kaskoDealerBank: value})
				break
			case 'kaskoFirstYear':
				this.setState({kaskoFirstYear: value})
				break
		}
		
	};

	popupAction = () => {
		this.props.updatePaymentState && typeof this.props.updatePaymentState === 'function' && this.props.updatePaymentState({setTab: 1})
	};

	popupCancel = (e, action) => {
		this.props.toggleFunc && typeof this.props.toggleFunc === 'function' && this.props.toggleFunc(e, action)
	};
	
	onFinish = values => {
		this.setState({formBusy: true})

		setTimeout(() => {
			this.setState({formBusy: false, SMSSent: true})
			
			typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()
		}, 200)
	};
	
	render() {
		const {popupCloseFunc, dropdown, added} = this.props;
		//const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
		
		let formDisabled = !this.state.insuranceCompName.length || !this.state[(this.state.manualPriceCheck ? 'insurancePrice' : 'insuranceTaxName')].length || this.state.formBusy
		
		let kaskoForm = 
			<>
				<Row gutter={20} className="kasko-car-select__controls mb_20 ant-row-cente">
					<Col span={24}>
						<FormSwitch controlName="kaskoDealerBank" value={this.state.kaskoDealerBank}
									onChangeCallback={this.formControlCallback}
									leftText="КАСКО дилера" rightText="КАСКО банка"/>
					</Col>
				</Row>
				
				{this.state.kaskoDealerBank ?
					<div className="kasko-car-select__dropdown--text">
						<p className="text_center">Вы включили кредитные программы, <br /> в которых КАСКО является обязательным условием. <br/>
							Вы можете выбрать страховой продукт банка <br/> в расхлопе кредитной программы.</p>
					</div>
					:
					<>
						<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
							<FormSelect span={dropdown ? 20 : 17} onChangeCallback={this.formControlCallback}
										dropdownClassName="select_dropdown_v1 popup"
										options={this.state.insuranceCompaniesList}
										placeholder="Страховая компания" controlName={'insuranceCompName'}
										value={this.state.insuranceCompName}/>
						</Row>
	
						<Row className="kasko-car-select__controls ant-row-center mb_20" gutter={20}>
							{this.state.manualPriceCheck ?
								<FormInput span={dropdown ? 20 : 17} onChangeCallback={this.formControlCallback}
										   placeholder="Введите стоимость"
										   controlName={'insurancePrice'} value={''}/>
								: <FormSelect span={dropdown ? 20 : 17} onChangeCallback={this.formControlCallback}
											  dropdownClassName="select_dropdown_v1 popup"
											  options={this.state.insuranceTaxList}
											  placeholder="Тариф" controlName={'insuranceTaxName'}
											  value={this.state.insuranceTaxName}/>
							}
						</Row>
	
						<Row gutter={20} className="kasko-car-select__controls mb_0 ant-row-center">
							<Col span={24}>
								<FormSwitch controlName="kaskoFirstYear" value={this.state.kaskoFirstYear}
											onChangeCallback={this.formControlCallback}
											leftText="На первый год" rightText="На весь срок кредита"/>
							</Col>
						</Row>

						<Row gutter={20} className="kasko-car-select__controls mb_20 ant-row-cente">
							<Col span={24}>
								<FormSwitch controlName="kaskoCash" value={this.state.kaskoCash}
											onChangeCallback={this.formControlCallback}
											leftText="В кредит" rightText="Наличные"/>
							</Col>
						</Row>
					</>
				}
			</>
		
		let calcMode = <Row gutter={20} className="kasko-car-select__controls mb_20 ant-row-center ant-space-align-center">
							<Col span={10}>
								<Button onClick={() => {this.popupAction()}} className={"w_100p fz_14 " + (this.state.formBusy ? "btn_grey" : "btn_green")}
								>Рассчитать</Button>
							</Col>
							<Col span={10} className="text_center">
								{added ?
									<span onClick={(e) => {this.popupCancel(e, {creditAdd: false})}} className="gl_link clr_gray">Убрать из кредита</span>
									: <Button onClick={(e) => {this.popupCancel(e, {creditAdd: true})}} className={"w_100p fz_14 ant-btn-primary"} disabled={this.state.formBusy ? "disabled" : null}
										>Добавить в кредит</Button>
								}
							</Col>
						</Row>
		
		let saveMode = <Row className="kasko-car-select__controls" gutter={20}>
							<Col span={6}>
								<div onClick={() => {typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()}}
									 className="ant-btn btn_green fz_14">Отменить</div>
							</Col>
							<Col span={12}>
								<Button htmlType={formDisabled ? null : "submit"}
										className={"w_100p " + (this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
										>Сохранить</Button>
							</Col>
						</Row>
		
		return (
			dropdown ?
				<>
					<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
						<div className="kaskotax-popup__form">
							{kaskoForm}
		
							{this.state.kaskoDealerBank ? saveMode : calcMode}
						</div>
					</Form>
				</>
			:
			<div className="kaskotax-popup">
				<div className="kaskotax-popup__close" onClick={popupCloseFunc}/>
				<div className="kaskotax-popup__title">Страхование КАСКО</div>

				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
					<div className="kaskotax-popup__form">
						{kaskoForm}

						{saveMode}
					</div>
				</Form>
			</div>
		);
	}
}

export default KaskotaxPopup;
