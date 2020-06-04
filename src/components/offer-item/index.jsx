import React, {Component, useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import {Col, InputNumber, Select, Switch, Tooltip} from "antd";
import {langs} from "../navbar/sidebar/global-const";

const {Option} = Select;

class OfferItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offerCollapsed: true,
			offerAdded: false,
			offerCash: false,
			showOffer: false,
			activeOffer: this.props.active,
			newPrice: 0
		};

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	
	static propTypes = {
		children: PropTypes.node,
		onOfferSelect: PropTypes.func,
		innerWidth: PropTypes.number
	};
	
	toggleOfferAdded = (e, index, offer) => {
		console.log('toggleOfferAdded');
		e.stopPropagation()
		this.setState({offerAdded: !this.state.offerAdded})
		
		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({
				id: index,
				active: this.state.offerAdded
			})

			//if (offer.func && typeof offer.func === 'function') {
			//	offer.func()
			//}			
		}, 0)
		
		return false;
	}

	toggleActiveOffer = (index) => {
		let active = this.state.activeOffer
		this.setState({
			newPrice: 10000,
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
		this.setState({offerCash: !this.state.offerCash})
	}

	goTo = (offer, goto) => {
		if (goto) {
			window.location = offer.href
		} else {
			this.setState({newPrice: 45450})
			this.toggleActiveOffer()
		}
	}
	
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	
	searchTree = (element, target) => {
		if (!element || ! target) return null;
		if (element.isEqualNode(target)) {
			return element;
		} else if (element.children != null) {
			let i;
			let result = null;
			for (i = 0; result == null && i < element.children.length; i++) {
				result = this.searchTree(element.children[i], target);
			}
			return result;
		}
		return null;
	}

	handleClickOutside(event) {
		if (!this.searchTree(this.wrapperRef, event.target)) {
			this.setState({offerCollapsed: true})
		}
	}
	
	render() {
		let {offer, slider, index, credit, active, completed} = this.props
		let prefix = active ? '' : (offer.price + '').replace(/\d/g, '')
		let price = formatMoney(((this.state.newPrice || offer.price) + '').replace(/\D/g, ''))

		console.log('offer', offer);
		
		return (
			slider ?
				<div key={index} className={"kasko-offer__slide slider " + (credit ? " credit" : "")}>
					<div ref={this.setWrapperRef} className={"kasko-offer__item" + (offer.collapse ? " collapsable" : "") + ((active || this.state.offerAdded) && !completed ? " active" : "") + (completed ? " completed" : "") + ((this.state.offerCollapsed) ? " collapsed" : "")}>
						<div onClick={() => ((offer.func && typeof offer.func === 'function') ? offer.func() : offer.href ? this.goTo(offer, offer.goto) : (this.toggleActiveOffer(index)))}
							className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
							{offer.button ? 
								<span className="kasko-offer__item--btn">{offer.button}</span> : 
								<Tooltip overlayClassName="tooltip_v1" placement="top" title={this.state.offerAdded ? "Удалить" : "Добавить"}>
									<span onClick={(e) => this.toggleOfferAdded(e, index, offer)} className={"kasko-offer__item--toggle"}/>
								</Tooltip>
							}
							<span className="kasko-offer__item--name">{offer.name}</span>
						</div>
						<div className="kasko-offer__item--body">
							{this.state.newPrice ? '' : offer.prefix}&nbsp;
							<span className="kasko-offer__item--price">{(prefix ? prefix + ' ' : '') + price}</span>
							&nbsp;{offer.suffix}
						</div>

						{(offer.collapse && !this.state.offerCollapsed) ?
							<div className="kasko-offer__item--info">
								<div className="kasko-offer__item--period text_center">Срок действия, лет</div>
								<InputNumber
									className="kasko-offer__item--period-input"
									defaultValue={1}
									min={1}
									max={30}
									//formatter={value => `${value}%`}
									//parser={value => value.replace('%', '')}
									onChange={this.onPeriodChange}
								/>

								{offer.options.length ? <ul className="kasko-offer__item--info-list">
									{offer.options.map((o, i) => <li key={i}>{o}</li>)}
								</ul> : ""}

								<div>
									<div
										className={"kasko-car-select__calculation" + (this.state.offerCash ? ' active' : '')}>
										<span className="kasko-car-select__calculation--text">В кредит</span>
										<Switch
											checked={this.state.offerCash}
											className="kasko-car-select__calculation--switch"
											onChange={this.onCreditChange}
										/>
										<span className="kasko-car-select__calculation--text">Наличные</span>
									</div>
								</div>
								
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
					{offer.collapse ?
						<div key={index} className={"kasko-offer__slide" + (credit ? " credit" : "")}>
							<div ref={this.setWrapperRef} className={"kasko-offer__item" + (offer.collapse ? " collapsable" : "") + ((active || this.state.offerAdded) && !completed ? " active" : "") + (completed ? " completed" : "") + ((this.state.offerCollapsed) ? " collapsed" : "")}>
								<div onClick={() => ((offer.func && typeof offer.func === 'function') ? offer.func() : offer.href ? this.goTo(offer, offer.goto) : (this.toggleActiveOffer(index)))}
									className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
									{offer.button ? 
										<span className="kasko-offer__item--btn">{offer.button}</span> : 
										<Tooltip overlayClassName="tooltip_v1" placement="top" title={this.state.offerAdded ? "Удалить" : "Добавить"}>
											<span onClick={(e) => this.toggleOfferAdded(e, index, offer)} className={"kasko-offer__item--toggle"}/>
										</Tooltip>
									}
									<span className="kasko-offer__item--name">{offer.name}</span>
								</div>
								<div className="kasko-offer__item--body">
									{this.state.newPrice ? '' : offer.prefix}&nbsp;
									<span className="kasko-offer__item--price">{(prefix ? prefix + ' ' : '') + price}</span>
									&nbsp;{offer.suffix}
								</div>
		
								{(offer.collapse && !this.state.offerCollapsed) ?
									<div className="kasko-offer__item--info">
										<div className="kasko-offer__item--period text_center">Срок действия, лет</div>
										<InputNumber
											className="kasko-offer__item--period-input"
											defaultValue={1}
											min={1}
											max={30}
											//formatter={value => `${value}%`}
											//parser={value => value.replace('%', '')}
											onChange={this.onPeriodChange}
										/>
		
										{offer.options.length ? <ul className="kasko-offer__item--info-list">
											{offer.options.map((o, i) => <li key={i}>{o}</li>)}
										</ul> : ""}
		
										<div>
											<div
												className={"kasko-car-select__calculation" + (this.state.offerCash ? ' active' : '')}>
												<span className="kasko-car-select__calculation--text">В кредит</span>
												<Switch
													checked={this.state.offerCash}
													className="kasko-car-select__calculation--switch"
													onChange={this.onCreditChange}
												/>
												<span className="kasko-car-select__calculation--text">Наличные</span>
											</div>
										</div>
										
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
						<Link ref={(el) => {this.node = el}} to={offer.link ? offer.link : "/offers"}
							  className={"kasko-offer__item" + (completed ? " completed" : "") + ((active || this.state.activeOffer) && !completed ? " active" : "")}>
							<div className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
								{offer.button ? <span className="kasko-offer__item--btn">{offer.button}</span> : ""}
								<span className="kasko-offer__item--name">{offer.name}</span>
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
					}
				</Col>
		);
	}
}

//OfferItem.propTypes = {
//	children: PropTypes.element.isRequired,
//};

export default OfferItem;
