import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form, Checkbox, Select} from "antd";

const {Option} = Select;

class KaskotaxPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formBusy: false,
			manualPriceCheck: false,
			insurancePrice: '30 000 ₽',
			insuranceCompName: '',
			insuranceTaxName: '',
			clientLastName: '',
			clientPhone: '',
			insuranceCompaniesList: [
				'Зетта-Страхование',
				'Бетта-Страхование',
				'Тетта-Страхование'
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
		innerWidth: PropTypes.number,
	};

	formRef = React.createRef();

	onFinish = values => {
		this.setState({formBusy: true})

		setTimeout(() => {
			this.setState({formBusy: false, SMSSent: true})
			
			typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()
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

	toggleSMSSent = () => {
		this.setState({SMSSent: !this.state.SMSSent})
	}

	onSMSCodeChange = e => {
		this.setState({SMSCode: e.target.value})

		if (('' + e.target.value).length === 4) {
			window.location = '/kasko_done'
		}
	};

	onInsuranceCompNameChange = value => {
		this.setState({insuranceCompName: value})
		//this.checkReadyState()
	};

	onInsuranceTaxNameChange = value => {
		this.setState({insuranceTaxName: value})
		//this.checkReadyState()
	};
	
	onInsurancePriceChange = e => {
		this.setState({insurancePrice: e.target.value})
	};

	onManualPriceToggle = e => {
		this.setState({manualPriceCheck: !this.state.manualPriceCheck})
	};
	
	onClientLastNameChange = e => {
		this.setState({clientLastName: e.target.value})
	};
	
	onClientPhoneChange = e => {
		this.setState({clientPhone: e.target.value})
	};

	render() {
		const {popupCloseFunc} = this.props;
		const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
		
		let formDisabled = !this.state.insuranceCompName.length || !this.state.insuranceTaxName.length || !this.state.insurancePrice.length || this.state.formBusy
		
		return (
			<div className="kaskotax-popup">
				<div className="kaskotax-popup__close" onClick={popupCloseFunc}/>
				<div className="kaskotax-popup__title">Страхование КАСКО</div>

				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
					<div className="kaskotax-popup__form">
						<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
							<Col span={12}>
								<Select
									dropdownClassName="select_dropdown_v1 popup"
									className={"w_100p custom_placeholder" + (this.state.insuranceCompName.length ? "" : " _empty")}
									placeholder=""
									onChange={this.onInsuranceCompNameChange}
									value={this.state.insuranceCompName}
								>
									{this.state.insuranceCompaniesList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
								</Select>
								<div className="float_placeholder">Страховая компания</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
							<Col span={12}>
								<Select
									dropdownClassName="select_dropdown_v1 popup"
									value={this.state.insuranceTaxName}
									className={"w_100p custom_placeholder" + (this.state.insuranceTaxName.length ? "" : " _empty")}
									placeholder=""
									onChange={this.onInsuranceTaxNameChange}
								>
									{this.state.insuranceTaxList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
								</Select>
								<div className="float_placeholder">Тариф</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
							<Col span={12} className="wnw">
								<Checkbox checked={this.state.manualPriceCheck ? "checked" : null}
										  onChange={this.onManualPriceToggle}>Внести стоимость вручную</Checkbox>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls ant-row-center mb_30" gutter={20}>
							<Col span={12}>
								<Input className={"w_100p custom_placeholder" + ((this.state.insurancePrice + '').length ? "" : " _empty")}
									   disabled={this.state.manualPriceCheck ? null : "disabled"}
									   value={this.state.insurancePrice}
									   onChange={this.onInsurancePriceChange}/>
								<div className="float_placeholder">Стоимость</div>
							</Col>
						</Row>
					
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={6}>
								<div onClick={() => {typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()}} className="ant-btn btn_green fz_14">Отменить</div>
							</Col>
							<Col span={12}>
								<Button htmlType={formDisabled ? null : "submit"}
										className={"w_100p " + (this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
										disabled={formDisabled ? 'disabled' : null}>Сохранить</Button>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		);
	}
}

export default KaskotaxPopup;
