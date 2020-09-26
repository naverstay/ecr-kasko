import React, {Component, useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import './style.scss';
import PropTypes from "prop-types";
import {formatMoney} from "../../helpers/formatMoney";
import searchTree from "../../helpers/searchTree";
import {Col, InputNumber, Select, Switch, Tooltip} from "antd";
import {langs} from "../navbar/sidebar/global-const";
import FormSwitch from "../form-switch";
import KaskotaxPopup from "../kaskotax-popup";

const {Option} = Select;

class OfferItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offerCollapsed: !this.props.opened,
			offerAdded: this.props.active,
			offerCash: false,
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

	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		if (name in this.state) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
			//this.checkReadyState()
		} else {
			console.log('no name in state', name);
		}
		
		switch (name) {
			case 'offerCash':
				this.setState({offerCash: value})
				break
		}
		
	};
	
	toggleOfferAdded = (e, index, offer) => {
		console.log('toggleOfferAdded');
		e.stopPropagation()
		
		let added = this.state.offerAdded
		
		this.setState({offerAdded: !added})
		
		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({
				id: index,
				active: !added
			})
		}, 0)
		
		return false;
	}

	toggleActiveOffer = (e, index) => {
		e && e.stopPropagation()
		
		let active = this.state.activeOffer
		this.setState({
			newPrice: !active ? 10000 : 0,
			activeOffer: !active,
			//offerCollapsed: !this.state.offerCollapsed, 
			offerAdded: !this.state.offerAdded
		})

		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({id: index, active: !active})
		}, 0)
		
		return false;
	}
	
	onPeriodChange = (value, index) => {
		this.setState({
			newPrice: (value === 1 ? 10000 : (value === 2 ? 15000 : 20000)),
			activeOffer: true,
			offerAdded: true
		})

		setTimeout(() => {
			if (typeof this.props.onOfferSelect === 'function') this.props.onOfferSelect({id: index, active: true})
		}, 0)
	}

	onShowOfferChange = (value) => {
		!this.props.noCollapse && this.setState({offerCollapsed: !this.state.offerCollapsed})
	}

	dropdownCallback = (action) => {
		console.log('dropdownCallback', action, this.props.offer);
		//this.onShowOfferChange()
		this.props.offer.dropdownCallback && typeof this.props.offer.dropdownCallback === 'function' && this.props.offer.dropdownCallback(action)
	}

	dropdownClose = (value) => {
		this.onShowOfferChange()
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
		!this.props.noCollapse && document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		!this.props.noCollapse && document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		//console.log('handleClickOutside', searchTree(this.wrapperRef, event.target), searchTree(document.getElementById('root'), event.target));
		if (searchTree(document.getElementById('root'), event.target) && !searchTree(document.getElementById('kasko-offers'), event.target)) {
			this.setState({offerCollapsed: true})
		}
	}
	
	render() {
		let {offer, slider, index, credit, active, completed, step} = this.props
		let prefix = active ? '' : (offer.price + '').replace(/\d/g, '')
		let price = formatMoney(((this.state.newPrice || offer.price) + '').replace(/\D/g, ''))
		
		return (
			slider ?
				<div key={index} className={"kasko-offer__slide slider " + (credit ? " credit" : "")}>
					<div ref={this.setWrapperRef} className={"kasko-offer__item" + (offer.collapse ? " collapsable": "") + ((this.state.offerAdded) && !completed ? " active" : "") + (completed ? " completed" : "") + ((this.state.offerCollapsed) ? " collapsed" : "")}>
						<div
							onClick={(e) => {
								if (offer.dropdown === 'KaskotaxPopup') {
									e.stopPropagation();
									this.onShowOfferChange(index);
									return false;
								} else {
									(offer.func && typeof offer.func === 'function') ? offer.func() : offer.href ? this.goTo(offer, offer.goto) : (this.toggleActiveOffer(e, index))
								}
							}}
							
							//onClick={(e) => {
							//	e.stopPropagation();
							//	this.onShowOfferChange(index);
							//	return false;
							//}}
							//onClick={(e) => ((offer.func && typeof offer.func === 'function') ? offer.func() : offer.href ? this.goTo(offer, offer.goto) : (this.toggleActiveOffer(e, index)))}
							className={"kasko-offer__item--title" + (offer.plus || offer.button || step > 1 ? " no_arrow" : " toggle_icon__") + (offer.plus ? " toggle_plus" : "")}>

							{offer.plus || step > 1 ? null :
								<span className="kasko-offer__item--open"/>
							}
							{offer.plus ?
								<span className={"kasko-offer__item--toggle"}/>
								: null
							}
							{offer.button ? 
								<span className="kasko-offer__item--btn">{offer.button}</span> 
								: null
								
								//<Tooltip overlayClassName="tooltip_v1" placement="top" title={this.state.offerAdded ? "Удалить" : "Добавить"}>
								//	<span onClick={(e) => this.toggleOfferAdded(e, index, offer)} className={"kasko-offer__item--toggle"}/>
								//</Tooltip>
							}
							<span className="kasko-offer__item--name">{offer.name}</span>

							{step > 1 ? null
								:
								<span>
									<span className="kasko-offer__item--price">{price}</span> {offer.plus ? null : <>&nbsp;{offer.suffix}</>}
								</span>
							}
						</div>
						{/*<div className="kasko-offer__item--body">*/}
						{/*	{this.state.newPrice ? '' : offer.prefix}&nbsp;*/}
						{/*	<span className="kasko-offer__item--price">{(prefix ? prefix + ' ' : '') + price}</span>&nbsp;{offer.suffix}*/}
						{/*</div>*/}

						{(offer.collapse && !this.state.offerCollapsed) ?
							offer.dropdown === 'KaskotaxPopup' ?
								<div className="kasko-offer__item--info wide">
									<KaskotaxPopup toggleFunc={(e, action) => {this.toggleOfferAdded(e, index, offer)}} updatePaymentState={this.dropdownCallback} popupCloseFunc={this.dropdownClose}
												   added={this.state.offerAdded} dropdown={true}/>
								</div>
							: <div className="kasko-offer__item--info">
								{offer.dealerFee ? 
									<div className="kasko-offer__item--fee">Доход дилера {offer.dealerFee}</div>
									: null
								}
								
								<div className="kasko-offer__item--period text_center">Срок действия, лет</div>
								<InputNumber
									className="kasko-offer__item--period-input"
									defaultValue={1}
									min={1}
									max={30}
									//formatter={value => `${value}%`}
									//parser={value => value.replace('%', '')}
									onChange={(value) => {this.onPeriodChange(value, index)}}
								/>

								{offer.options.length ?
									<ul className="kasko-offer__item--info-list">
										{offer.options.map((o, i) => <li key={i}>{o}</li>)}
									</ul> 
									: null
								}

								<FormSwitch controlName="offerCash" value={this.state.offerCash}
											onChangeCallback={this.formControlCallback}
											leftText="В кредит" rightText="Наличные"/>
								
								{/*<div className="text_center">*/}
								{/*	<div onClick={() => this.onShowOfferChange(index)}*/}
								{/*		 className="kasko-offer__item--info-close">Свернуть</div>*/}
								{/*</div>*/}
							</div>
							: null
						}
					</div>
				</div>
			:
				<Col span={6} key={index}>
					{offer.collapse ?
						<div key={index} className={"kasko-offer__slide" + (credit ? " credit" : "")}>
							<div ref={this.setWrapperRef} className={"kasko-offer__item" + (offer.collapse ? " collapsable" : "") + ((active || this.state.offerAdded) && !completed ? " active" : "") + (completed ? " completed" : "") + ((this.state.offerCollapsed) ? " collapsed" : "")}>
								<div onClick={(e) => ((offer.func && typeof offer.func === 'function') ? offer.func() : offer.href ? this.goTo(offer, offer.goto) : (this.toggleActiveOffer(e, index)))} className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
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
											onChange={(value) => {this.onPeriodChange(value, index)}}
										/>
		
										{offer.options.length ? <ul className="kasko-offer__item--info-list">
											{offer.options.map((o, i) => <li key={i}>{o}</li>)}
										</ul> : null}

										<FormSwitch controlName="offerCash" value={this.state.offerCash} 
													onChangeCallback={this.formControlCallback}
													leftText="В кредит" rightText="Наличные"/>
										
										<div className="text_center">
											<div onClick={() => this.onShowOfferChange(index)}
												 className="kasko-offer__item--info-close">Свернуть</div>
										</div>
									</div>
									: null
								}
							</div>
						</div>
						:
						<Link ref={(el) => {this.node = el}} to={offer.link ? offer.link : "/offers"}
							  className={"kasko-offer__item" + (completed ? " completed" : "") + ((active || this.state.activeOffer) && !completed ? " active" : "")}>
							<div className={"kasko-offer__item--title" + (offer.button ? " no_arrow" : " toggle_icon")}>
								{offer.button ? <span className="kasko-offer__item--btn">{offer.button}</span> : null}
								<span className="kasko-offer__item--name">{offer.name}</span>
							</div>
							<div className="kasko-offer__item--body">
								<p>
									{active ? null : offer.prefix}
									{active ? null : <>&nbsp;</>}
									<span className="kasko-offer__item--price">{formatMoney(offer.price)}</span>
									&nbsp;{offer.suffix}
								</p>
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
