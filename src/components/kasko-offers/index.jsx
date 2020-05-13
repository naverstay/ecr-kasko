import React, {Component} from "react";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import Slider from "react-slick";

class KaskoOffers extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		offersList: PropTypes.array,
	};
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		let {offersList, slider} = this.props

		let carouselSettings = {
			dots: false,
			slidesPerRow: 4
		};
		
		return (
			slider ?
				<Slider {...carouselSettings}>
					{
						offersList.map((o, i) => <div className={"slick-slide"} key={i}>
							<Link to="/offers" className="kasko-offer__item">
								<div className="kasko-offer__item--title">{o.name}</div>
								<div className="kasko-offer__item--body">
									{o.prefix}&nbsp;
									<span className="kasko-offer__item--price">{formatMoney(o.price)}</span>
									&nbsp;{o.suffix}
								</div>
							</Link>
						</div>)
					}
				</Slider>
			: <div className="kasko-offer">
				<Row gutter={20} className="kasko-offer__list">
					{offersList.map((o, i) => <Col span={6} key={i}>
						<Link to="/offers" className="kasko-offer__item">
							<div className="kasko-offer__item--title">{o.name}</div>
							<div className="kasko-offer__item--body">
								{o.prefix}&nbsp;
								<span className="kasko-offer__item--price">{formatMoney(o.price)}</span>
								&nbsp;{o.suffix}
							</div>
						</Link>
					</Col>)}
				</Row>
				
				<div className="kasko-offer__more"><div className="gl_link">Показать все F&I меню</div></div>
			</div>
		);
	}
}

export default KaskoOffers;