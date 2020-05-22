import React, {Component} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import {Col} from "antd";

class OfferItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOffer: false
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
			this.props.onOfferSelect({id: index, active: this.state.activeOffer})
		}, 0)
	}

	render() {
		let {offer, slider, index} = this.props
		let prefix = (offer.price + '').replace(/\d/g, '')
		let price = formatMoney((offer.price + '').replace(/\D/g, ''))
		
		return (
			slider ?
				<div key={index} className={"kasko-offer__slide"}>
					<div onClick={() => this.toggleActiveOffer(index)} className={"kasko-offer__item" + (this.state.activeOffer ? " active" : "")}>
						<div className="kasko-offer__item--title">{offer.name}</div>
						<div className="kasko-offer__item--body">
							{offer.prefix}&nbsp;
							<span className="kasko-offer__item--price">{prefix + ' ' + price}</span>
							&nbsp;{offer.suffix}
						</div>
					</div>
				</div>
			:
				<Col span={6} key={index}>
					<Link to="/offers" className="kasko-offer__item">
						<div className="kasko-offer__item--title">{offer.name}</div>
						<div className="kasko-offer__item--body">
							<p>
								{offer.prefix}&nbsp;
								<span className="kasko-offer__item--price">{formatMoney(offer.price)}</span>
								&nbsp;{offer.suffix}
							</p>
							<p className="text_center">
								<div className="kasko-offer__item--link">Рассчитать</div>
							</p>
						</div>
					</Link>
				</Col>
		);
	}
}

export default OfferItem;