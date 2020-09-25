import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form, Checkbox, Select} from "antd";

const {Option} = Select;

class ManagerPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formBusy: false,
			manualPriceCheck: false,
			insurancePrice: '30 000 ₽',
			salesManagerName: '',
			credSpecName: '',
			clientLastName: '',
			clientPhone: '',
			salesManagerList: [
				'Ларин К. О.',
				'Резник Д. М.',
				'Иванов В. П.'
			],
			credSpecList: [
				'Константинопольский Константин',
				'Константинопольский супер',
				'Константинопольский мега'
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
		this.setState({salesManagerName: value})
		//this.checkReadyState()
	};

	onInsuranceTaxNameChange = value => {
		this.setState({credSpecName: value})
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
		const {popupCloseFunc, subtitle} = this.props;
		//const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
		
		let formDisabled = !this.state.salesManagerName.length || !this.state.credSpecName.length || !this.state.insurancePrice.length || this.state.formBusy
		
		return (
			<div className="kaskotax-popup manager-popup">
				<div className="kaskotax-popup__close" onClick={popupCloseFunc}/>
				<div className={"kaskotax-popup__title" + (subtitle && subtitle.length ? ' mb_10' : '')}>Изменить менеджера</div>
				<div className="kaskotax-popup__subtitle">{subtitle}</div>

				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
					<div className="kaskotax-popup__form">
						<p style={{marginBottom: '15px'}}>
							Вы можете выбрать менеджера отдела продаж и кредитного
							специалиста из предложенного списка.
						</p>
						
						<p>
							Не нашли сотрудника? <br />
							<span className="gl_link color_gray">Добавьте с помощью админки в екредит</span>
						</p>
						
						<Row className="kasko-car-select__controls mb_30" gutter={20}>
							<Col span={12}>
								<Select
									dropdownClassName="select_dropdown_v1 popup"
									className={"w_100p custom_placeholder" + (this.state.salesManagerName.length ? "" : " _empty")}
									placeholder=""
									onChange={this.onInsuranceCompNameChange}
									value={this.state.salesManagerName}
								>
									{this.state.salesManagerList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
								</Select>
								<div className="float_placeholder">Менеджер отдела продаж</div>
							</Col>
							<Col span={12}>
								<Select
									dropdownClassName="select_dropdown_v1 popup"
									value={this.state.credSpecName}
									className={"w_100p custom_placeholder" + (this.state.credSpecName.length ? "" : " _empty")}
									placeholder=""
									onChange={this.onInsuranceTaxNameChange}
								>
									{this.state.credSpecList.map((e, i) => <Option key={i} value={e}>{e}</Option>)}
								</Select>
								<div className="float_placeholder">Кредитный специалист</div>
							</Col>
						</Row>
					
						<Row className="kasko-car-select__controls mb_30" gutter={20}>
							<Col span={6}>
								<div onClick={() => {typeof this.props.popupCloseFunc === 'function' && this.props.popupCloseFunc()}} className="ant-btn btn_green fz_14 w_100p"><span>Отменить</span></div>
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

export default ManagerPopup;
