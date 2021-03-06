import React, {Component} from "react";
import {Checkbox, Tooltip} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";

class ServiceRow extends Component {
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
		const {offers, logo, name, info, dealer, company, completed, waiting, allowCheck} = this.props
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
										
										{dealer ? <div className={"offer-row__dealer"}>{dealer}</div> : null}
									</td>

									<td>
										<div className="offer-row__price">{formatMoney(o.price)} ₽</div>
									</td>
									
									<td>
										<div className="offer-row__fee">{o.period}</div>
									</td>

									<td>
										<div className="offer-row__fee">{o.payment}</div>
									</td>

									<td>&nbsp;</td>

									<td>{o.recipient}
										<Tooltip overlayClassName="tooltip_v1" placement="top"
												 title={o.recipientInfo}>
											<span className={"offer-row__info"} />
										</Tooltip>
									</td>

									{(completed || waiting) ?
										<td>
											<div className={"offer-row__status " + (completed ? "approved" : "waiting")}/>
										</td>
									: 
										<td>
											<Checkbox disabled={((allowCheck) ? null : "disabled")} className="offer-row__check" onChange={(e) => this.onSelectOfferToggle(company, i, e)}/>
										</td>
									}
									
									<td>
										<div onClick={() => this.addOptionFlag(i)} className="offer-row__link"/>
									</td>
								</tr>
								{showOptions ?
									<tr key={i + 100000} className={(offerSelected ? "selected" : "")}>
										<td>&nbsp;</td>
										<td colSpan={5}>
											<ul className="offer-row__options check cols-3">
												{o.options.map((opt, k) => <li key={k}>{opt}</li>)}
											</ul>
										</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									: null}
							</> : null)
				})}
			</>
		);
	}
}

export default ServiceRow;
