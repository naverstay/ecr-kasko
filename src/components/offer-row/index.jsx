import React, {Component} from "react";
import {Checkbox} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";

class OfferRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsCollapsed: true,
			offerSelected: {},
			optionsToggle: {}
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		selectedOffer: PropTypes.func,
		offers: PropTypes.array,
	};

	onSelectOfferToggle = (company, index, e) => {
		let options = Object.assign({}, this.state.offerSelected)
		
		options[index] = e.target.checked

		this.setState({offerSelected: options})
		
		setTimeout(() => {
			console.log('onSelectOfferToggle', company, this.state.offerSelected);
			if (typeof this.props.selectedOffer === 'function') this.props.selectedOffer(company, this.state.offerSelected)
		})
	}
	
	onCollapseToggle = () => {
		this.setState({rowsCollapsed: !this.state.rowsCollapsed})
	}

	addOptionFlag (index) {
		let options = Object.assign({}, this.state.optionsToggle)

		if (index in options) {
			options[index] = !options[index]
		} else {
			options[index] = true
		}
		
		this.setState({optionsToggle: options})
	}

	render() {
		const {offers, logo, name, info, credit, company, completed, waiting, allowCheck, osago, franchise} = this.props
		const moreLink = 'еще ' + (offers.length - 1) + ' ' + pluralFromArray(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))
		const lessLink = 'скрыть ' + (offers.length - 1) + ' ' + pluralFromArray(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))
		
		return (
			<>
				{offers.map((o, i) => {
					const show = (i === 0 || !this.state.rowsCollapsed)
					const showOptions = (i in this.state.optionsToggle) && this.state.optionsToggle[i]
					const offerSelected = (i in this.state.offerSelected) && this.state.offerSelected[i]
					
					return (show ? 
							<>
								<tr key={i} className={(showOptions ? "expanded" : "") + (offerSelected ? " selected" : "")}>
									<td>
										{i === 0 ? logo ? <div className={"offer-row__logo"}><img src={logo} alt=""/></div> : <div className={"offer-row__logo" + (info ? " info" : "")}>{name}</div> : null}
									</td>
									{!osago ? <td>
										<div className="offer-row__name">{o.name}</div>
										{(this.state.rowsCollapsed && i === 0 && offers.length > 1) ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{moreLink}</div> : ""}
										{(!this.state.rowsCollapsed && (i === offers.length - 1) && offers.length > 1) ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{lessLink}</div> : ""}
									</td> : null}
																	
									{franchise ?
										<td>
											<div className="offer-row__fee">{o.franchise}</div>
										</td>
									: null}

									<td>
										<div className="offer-row__price">{formatMoney(o.price)} ₽</div>
									</td>
									
									{credit ?
										<td>
											<div className="offer-row__fee">{o.rate}</div>
										</td>
									: null}
			
									<td>
										<div className="offer-row__fee">{formatMoney(o.dealerFee)} ₽</div>
									</td>
									
									{(completed || waiting) ?
										<>
											<td>
												<div className="offer-row__date">{o.dateStart}</div>
												<div className="offer-row__date">{o.dateEnd}</div>
											</td>
											<td className="text_left">
												<div className="offer-row__documents">
													<div className="gl_link color_black">{o.document}</div>
													<div className="offer-row__bill gl_link">Счет на оплату</div>
												</div>
											</td>
											<td>
												<div className={"offer-row__status " + (completed ? "approved" : "waiting")}/>
											</td>
										</>
									: 
										<>
											{credit ?
												<td>
													<div className="offer-row__fee text_left">
														{ o.params.map((p, i) => <p key={i}>{p}</p>) }
													</div>
												</td>
											:
												osago ?
													<td className="text_left">
														<div className="offer-row__documents">
															<div className="offer-row__bill gl_link">Счет на оплату</div>
														</div>
													</td>
												:
													<td>&nbsp;</td>
											}
										
											<td>
												<Checkbox disabled={((allowCheck || osago) ? null : "disabled")} className="offer-row__check" onChange={(e) => this.onSelectOfferToggle(company, i, e)}/>
											</td>
											{!osago ? <td>
												<div onClick={() => this.addOptionFlag(i)} className="offer-row__link"/>
											</td> : null}
										</>
									}
								</tr>
								{!osago && (!completed && showOptions) ?
									<tr key={i + 100000} className={(offerSelected ? "selected" : "")}>
										<td>&nbsp;</td>
										
										{credit ?
											<>
												<td>&nbsp;</td>
												<td colSpan={6}>
													<ul className="offer-row__options">
														{o.options.map((opt, k) => <li key={k} className="offer-row__credit">
															<div className="offer-row__credit--name">{opt.option || ''}</div>
															<div onClick={() => {opt.func && opt.func()}} className={"offer-row__credit--link" + ((opt.link || opt.func) ? ' gl_link' : '')}>{opt.price || ''}</div>
														</li>)}
													</ul>
												</td>
											</>
											:
											<>
												<td>&nbsp;</td>
												{franchise ? <td>&nbsp;</td> : null}
												<td colSpan={4}>
													<ul className="offer-row__options">
														{o.options.map((opt, k) => <li key={k}>{opt}</li>)}
													</ul>
												</td>
												<td>&nbsp;</td>
											</>
										}
									</tr>
									: null}
							</> : null)
				})}
			</>
		);
	}
}

export default OfferRow;
