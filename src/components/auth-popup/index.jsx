import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form} from "antd";
import moment from "moment";


class AuthPopup extends Component {
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
			<div className="auth-popup">
				<div className="auth-popup__close" onClick={popupCloseFunc}/>
				<div className="auth-popup__title">Вход в Личный кабинет</div>
				<p className="text_center">
					Введите данные, которые указывали при расчете, <br /> 
					и мы отправим вам на мобильный телефон код для входа.
				</p>

				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
					<div className="auth-popup__form">
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={24}>
								<Input
									className={"w_100p custom_placeholder " + ((this.state.clientLastName + '').length ? "" : " _empty")}
									value={this.state.clientLastName}
									onChange={this.onClientLastNameChange} defaultValue=""/>
								<div className="float_placeholder">Фамилия</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={24}>
								<Input data-inputmask={clientPhoneMask}
									   className={"w_100p custom_placeholder" + ((this.state.clientPhone + '').length ? "" : " _empty")}
									   value={this.state.clientPhone}
									   onChange={this.onClientPhoneChange} defaultValue=""/>
								<div className="float_placeholder">Мобильный телефон</div>
							</Col>
						</Row>
						<Row className="kasko-car-select__controls" gutter={20}>
							<Col span={24}>
								{this.state.SMSSent ?
									<div className="offer-select__sms">
										<Input maxLength={4}
											className={"w_100p custom_placeholder" + (this.state.SMSCode.length ? "" : " _empty")}
											onChange={this.onSMSCodeChange}
											defaultValue=""/>
										<div className="float_placeholder">Код подтверждения</div>
										<div className="gl_link"
											 onClick={this.toggleSMSSent}>Отправить код повторно</div>
									</div>
									:
									<Button htmlType={formDisabled ? null : "submit"}
											className={"w_100p " + (this.state.carFound !== void 0 ? "btn_grey" :
												this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
											disabled={formDisabled ? 'disabled' : null}>Получить код</Button>
								}
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		);
	}
}

export default AuthPopup;
