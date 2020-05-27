import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import {Col, InputNumber, Select} from "antd";
import {langs} from "../navbar/sidebar/global-const";

const {Option} = Select;

class OfferItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOffer: this.props.active,
			newPrice: 0
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		onOfferSelect: PropTypes.func,
		innerWidth: PropTypes.number
	};

	toggleActiveOffer = (index) => {
		let active = this.state.activeOffer
		this.setState({activeOffer: !active})
		
		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({id: index, active: this.state.activeOffer})
		}, 0)
	}
	
	onPeriodChange = (value) => {
		console.log('changed', value);
	}

	goTo = (offer) => {
		this.setState({newPrice: 45450})

		this.toggleActiveOffer()
		//window.location = offer.href
	}

	render() {
		let {offer, slider, index, credit, active} = this.props
		let prefix = (offer.price + '').replace(/\d/g, '')
		let price = formatMoney(((this.state.newPrice || offer.price) + '').replace(/\D/g, ''))

		console.log('OfferItem active', index, active);
		
		return (
			slider ?
				<div key={index} className={"kasko-offer__slide" + (credit ? " credit" : "")}>
					<div className={"kasko-offer__item" + (offer.collapse ? " collapsable" : "") + ((active || this.state.activeOffer) ? " active" : "")}>
						<div onClick={() => (offer.href ? this.goTo(offer) : this.toggleActiveOffer(index))}
							className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
							<span>{offer.name}</span>
							{offer.button ? <span className="kasko-offer__item--btn">{offer.button}</span> : ""}
						</div>
						<div className="kasko-offer__item--body">
							{offer.prefix}&nbsp;
							<span className="kasko-offer__item--price">{(prefix ? prefix + ' ' : '') + price}</span>
							&nbsp;{offer.suffix}
						</div>

						{(offer.collapse) ?
							<div className="kasko-offer__item--info">
								<div className="kasko-offer__item--period">Срок действия, лет</div>
								<InputNumber
									className="kasko-offer__item--period-input"
									defaultValue={1}
									min={1}
									max={30}
									//formatter={value => `${value}%`}
									//parser={value => value.replace('%', '')}
									onChange={this.onPeriodChange}
								/>

								<div>
									<Select
										size="small"
										dropdownClassName="select_dropdown_v1"
										className={"select_v2"}
										placeholder=""
										value={'В кредит'}
									>
										{['В кредит', 'Наличные'].map((e, i) => <Option key={i} value={e}>{e}</Option>)}
									</Select>
								</div>

								{offer.options.length ? <ul className="kasko-offer__item--info-list">
									{offer.options.map((o, i) => <li key={i}>{o}</li>)}
								</ul> : ""}

								<div className="text_center">
									<div onClick={() => this.toggleActiveOffer(index)}
										 className="kasko-offer__item--info-close">Свернуть</div>
								</div>
							</div>
							: ""
						}
					</div>
				</div>
			:
				<Col span={6} key={index}>
					<Link to={offer.link ? offer.link : "/offers"} className={"kasko-offer__item" + ((active || this.state.activeOffer) ? " active" : "")}>
						<div className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
							<span>{offer.name}</span>
							{offer.button ? <span className="kasko-offer__item--btn">{offer.button}</span> : ""}
						</div>
						<div className="kasko-offer__item--body">
							<p>
								{offer.prefix}&nbsp;
								<span className="kasko-offer__item--price">{formatMoney(offer.price)}</span>
								&nbsp;{offer.suffix}
							</p>
							{/*<p className="text_center">*/}
							{/*	<span className="kasko-offer__item--link">Рассчитать</span>*/}
							{/*</p>*/}
						</div>
					</Link>
				</Col>
		);
	}
}

export default OfferItem;
