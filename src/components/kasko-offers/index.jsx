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
		console.log('toggleActiveOffer', offer);
		//const active = e.target.classList.contain('active')
		// e.target.classList.toggleClass('active', !active)
		
		
		this.props.onOfferSelect(offer)
	}

	render() {
		let {offersList, slider, onOfferSelect} = this.props

		let carouselSettings = {
			dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
		};
		
		return (
			slider ?
				<Slider {...carouselSettings}>
					{
						offersList.map((o, i) => <OfferItem key={i} onOfferSelect={onOfferSelect} slider={true} index={i} offer={o} />)
					}
				</Slider>
			: 
			<div className="kasko-offer">
				<Row gutter={20} className="kasko-offer__list">
					{offersList.map((o, i) => <OfferItem key={i} index={i} offer={o}/>)}
				</Row>
				
				<div className="kasko-offer__more"><div className="gl_link">Показать все F&I меню</div></div>
			</div>
		);
	}
}

export default KaskoOffers;