import React, {Component} from "react";
import {Row} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
		let {offersList, opened, onOfferSelect, disabled, credit, active, completed, step} = this.props
		
		let carouselSettings = {
			dots: false,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: false
		};

		console.log('opened', opened);
		
		return (
			<div className="kasko-car-select__carousel" id="kasko-offers">
				<Slider className={"kasko-offer" + (disabled ? " disabled" : "")} {...carouselSettings}>
					{
						offersList.map((o, i) => <OfferItem 
							offerItemCallback={this.props.offerItemCallback} step={step}
							opened={opened && opened.length && opened.indexOf(i) > -1} 
							active={active && active.length && active.indexOf(i) > -1} 
							completed={completed && completed.length && completed.indexOf(i) > -1} 
							key={i} credit={credit} onOfferSelect={onOfferSelect} slider={true} index={i} offer={o} />)
					}
				</Slider>
			</div>
		);
	}
}

export default KaskoOffers;
