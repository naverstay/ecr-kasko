import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form} from "antd";
import moment from "moment";


class CalcsavePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formBusy: false,
			SMSSent: false,
			SMSCode: '',
			clientLastName: '',
			clientPhone: '',
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
	
	onClientLastNameChange = e => {
		this.setState({clientLastName: e.target.value})
	};
	
	onClientPhoneChange = e => {
		this.setState({clientPhone: e.target.value})
	};

	render() {
		const {popupCloseFunc} = this.props;
		const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"

		let formDisabled = !this.state.clientPhone.length || this.state.clientPhone.indexOf('_') > -1 || this.state.formBusy

		return (
			<div className="calcsave-popup">
				<div className="calcsave-popup__close" onClick={popupCloseFunc}/>
				<div className="calcsave-popup__title">Ваши контакты</div>

				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
					<div className="calcsave-popup__form">
						<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
							<Col span={16}>
								<Input
									className={"w_100p custom_placeholder " + ((this.state.clientLastName + '').length ? "" : " _empty")}
									value={this.state.clientLastName}
									onChange={this.onClientLastNameChange} defaultValue=""/>
								<div className="float_placeholder">Фамилия и Имя</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls ant-row-center mb_30" gutter={20}>
							<Col span={16}>
								<Input data-inputmask={clientPhoneMask}
									   className={"w_100p custom_placeholder" + ((this.state.clientPhone + '').length ? "" : " _empty")}
									   value={this.state.clientPhone}
									   onChange={this.onClientPhoneChange} defaultValue=""/>
								<div className="float_placeholder">Телефон</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={4} />
							<Col>
								<div className="ant-btn btn_green fz_14">Отменить</div>
							</Col>
							<Col>
								<Button htmlType={formDisabled ? null : "submit"}
										className={"w_100p " + (this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
										disabled={formDisabled ? 'disabled' : null}>Сохранить расчет</Button>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		);
	}
}

export default CalcsavePopup;
