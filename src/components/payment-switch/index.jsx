import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Tooltip} from "antd";

class PaymentSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPaymentOptions: false
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number
	};

	togglePaymentOptions = () => {
		this.setState({
			showPaymentOptions: !this.state.showPaymentOptions
		})
	}
	
	render() {
		const {paymentStep, allowPayment} = this.props
		
		return (
			<div className="payment-switch">
				<Tooltip overlayClassName="tooltip_v1" placement="top"
						 title="Оплатить на сайте страховой компании">
					<div onClick={this.togglePaymentOptions} className={"payment-switch__label ant-btn btn_middle btn_green" + (allowPayment ? "" : " disabled")}>Оплатить онлайн</div>
				</Tooltip>
				{
					(allowPayment && this.state.showPaymentOptions) ?
						<div className="payment-switch__dropdown">
							<p>Отправить ссылку на оплату:</p>
							<ul className="payment-switch__options">
								<li className="payment-switch__options--item">
									<div className="payment-switch__btn email">
										<span>На емейл</span>
									</div>
								</li>
								<li className="payment-switch__options--item">
									<div className="payment-switch__btn sms">
										<span>На мобильный</span>
									</div>
								</li>
								<li className="payment-switch__options--item separator">
									<div className="payment-switch__btn browser">
										<span>Открыть в браузере</span>
									</div>
								</li>
							</ul>
						</div>
						: ""
				}
			</div>
		);
	}
}

export default PaymentSwitch;
