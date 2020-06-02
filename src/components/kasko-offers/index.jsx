import React, {Component} from "react";
import {Row} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import Slider from "react-slick";
import OfferItem from "../offer-item";

class KaskoOffers extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		onOfferSelect: PropTypes.func,
		offersList: PropTypes.array,
	};
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	toggleActiveOffer = (offer) => {
		if (typeof this.props.onOfferSelect === 'function') {
			this.props.onOfferSelect(offer)
		}
	}

	render() {
		let {offersList, slider, onOfferSelect, disabled, credit, active, completed} = this.props
		
		let carouselSettings = {
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: false
		};
		
		return (
			slider ?
				<Slider {...carouselSettings}>
					{
						offersList.map((o, i) => <OfferItem active={active && active.length && active.indexOf(i) > -1} completed={completed && completed.length && completed.indexOf(i) > -1} key={i} credit={credit} onOfferSelect={onOfferSelect} slider={true} index={i} offer={o} />)
					}
				</Slider>
			: 
			<div className={"kasko-offer" + (disabled ? " disabled" : "")}>
				<Row gutter={20} className="kasko-offer__list">
					{offersList.map((o, i) => <OfferItem active={active && active.length && active.indexOf(i) > -1} completed={completed && completed.length && completed.indexOf(i) > -1} key={i} index={i} offer={o}/>)}
				</Row>

				{disabled ? "" :
					<div className="kasko-offer__more">
						<div className="gl_link">Показать все F&I меню</div>
					</div>
				}
			</div>
		);
	}
}

export default KaskoOffers;