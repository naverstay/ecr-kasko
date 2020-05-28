import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import {Col, InputNumber, Select, Switch} from "antd";
import {langs} from "../navbar/sidebar/global-const";

const {Option} = Select;

class OfferItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offerCollapsed: true,
			offerAdded: false,
			offerCredit: true,
			showOffer: false,
			activeOffer: this.props.active,
			newPrice: 0
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		onOfferSelect: PropTypes.func,
		innerWidth: PropTypes.number
	};

	toggleOfferAdded = (e, index) => {
		e.stopPropagation()
		this.setState({offerAdded: !this.state.offerAdded})
		
		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({
				id: index,
				active: this.state.activeOffer
			})
		}, 0)
		
		return false;
	}

	toggleActiveOffer = (index) => {
		let active = this.state.activeOffer
		this.setState({
			activeOffer: true,
			collapse: !this.state.collapse,
			offerCollapsed: !this.state.offerCollapsed, 
			showOffer: !this.state.showOffer,
			offerAdded: true
		})
		
		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({id: index, active: this.state.activeOffer})
		}, 0)
	}
	
	onPeriodChange = (value) => {
		this.setState({newPrice: (value === 1 ? 10000 : (value === 2 ? 15000 : 20000))})
	}

	onShowOfferChange = (value) => {
		this.setState({offerCollapsed: !this.state.offerCollapsed})
	}

	onCreditChange = (value) => {
		this.setState({offerCredit: !this.state.offerCredit})
	}

	goTo = (offer) => {
		this.setState({newPrice: 45450})

		this.toggleActiveOffer()
		//window.location = offer.href
	}

	render() {
		let {offer, slider, index, credit, active} = this.props
		let prefix = active ? '' : (offer.price + '').replace(/\d/g, '')
		let price = formatMoney(((this.state.newPrice || offer.price) + '').replace(/\D/g, ''))
		
		return (
			slider ?
				<div key={index} className={"kasko-offer__slide" + (credit ? " credit" : "")}>
					<div className={"kasko-offer__item" + (offer.collapse ? " collapsable" : "") + ((active || this.state.offerAdded) ? " active" : "") + ((this.state.offerCollapsed) ? " collapsed" : "")}>
						<div onClick={() => (offer.href ? this.goTo(offer) : this.toggleActiveOffer(index))}
							className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
							<span>{offer.name}</span>
							{offer.button ? 
								<span className="kasko-offer__item--btn">{offer.button}</span> : 
								<span onClick={(e) => this.toggleOfferAdded(e, index)} className={"kasko-offer__item--toggle"}/>
							}
						</div>
						<div className="kasko-offer__item--body">
							{this.state.newPrice ? '' : offer.prefix}&nbsp;
							<span className="kasko-offer__item--price">{(prefix ? prefix + ' ' : '') + price}</span>
							&nbsp;{offer.suffix}
						</div>

						{(offer.collapse && !this.state.offerCollapsed) ?
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
									<div className={"kasko-car-select__calculation" + (this.state.offerCredit ? ' active' : '')}>
										<span className="kasko-car-select__calculation--text">В кредит</span>
										<Switch 
											checked={this.state.offerCredit}
											className="kasko-car-select__calculation--switch"
											onChange={this.onCreditChange}
										/>
										<span className="kasko-car-select__calculation--text">Наличные</span>
									</div>
								</div>

								{offer.options.length ? <ul className="kasko-offer__item--info-list">
									{offer.options.map((o, i) => <li key={i}>{o}</li>)}
								</ul> : ""}

								<div className="text_center">
									<div onClick={() => this.onShowOfferChange(index)}
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
								{active ? '' : offer.prefix}
								{active ? '' : <>&nbsp;</>}
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
