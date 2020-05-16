import React, {Component} from "react";
import {Row} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import Slider from "react-slick";
//import ReactSwipe from 'react-swipe';
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
			slidesPerRow: 4
		};
		
		let reactSwipeEl;
		let swipeOptions = {
			continuous: true,
			slidesPerView: 4
		}
		
		return (
			slider ?
				<Slider {...carouselSettings}>
					{
						offersList.map((o, i) => <OfferItem key={i} onOfferSelect={onOfferSelect} slider={true} index={i} offer={o} />)
					}
				</Slider>
				//<>
				//	<ReactSwipe
				//		className="carousel"
				//		swipeOptions={swipeOptions}
				//		ref={el => (reactSwipeEl = el)}
				//	>
				//		{
				//			offersList.map((o, i) => <OfferItem key={i} onOfferSelect={onOfferSelect} slider={true}
				//											 index={i} offer={o}/>)
				//		}
				//		
				//		{/*<div>PANE 1</div>*/}
				//		{/*<div>PANE 2</div>*/}
				//		{/*<div>PANE 3</div>*/}
				//	</ReactSwipe>
				//	<button onClick={() => reactSwipeEl.next()}>Next</button>
				//	<button onClick={() => reactSwipeEl.prev()}>Previous</button>
				//</>
			
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