import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";

class KaskoCarInfo extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		notificationCount: PropTypes.any,
	};
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		const {carName, image, info, price, notificationCount} = this.props;
		return (
			<div className="kasko-car-info">
				<div className="kasko-car-info__notification">{notificationCount ? <span>{notificationCount}</span> : ""}</div>
				<div className={"kasko-car-info__name" + ((carName) ? "" : " _inactive")}>{carName || 'Авто'}</div>
				<div className={"kasko-car-info__info _inactive"}>{info || 'Инфо'}</div>
				<div className={"kasko-car-info__info _inactive"}>{price || 'Цена'}</div>
				<div className="kasko-car-info__image">
					<img src={image || 'car-1-s.png'} alt=""/>
				</div>
				<div className="kasko-car-info__controls">
					{/*<Radio.Group onChange={this.onChange} >*/}
					{/*	<Radio value={1}>Кредит</Radio>*/}
					{/*	<Radio value={2}>ОСАГО</Radio>*/}
					{/*	<Radio value={3}>КАСКО</Radio>*/}
					{/*</Radio.Group>*/}

					<ul className="kasko-car-info__status">
						<li className="kasko-car-info__status--item">Кредит</li>
						<li className="kasko-car-info__status--item">ОСАГО</li>
						<li className={"kasko-car-info__status--item" + (notificationCount ? ' waiting' : '')}>КАСКО</li>
					</ul>
					
				</div>
			</div>
		);
	}
}

export default KaskoCarInfo;