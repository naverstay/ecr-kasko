import React, {Component} from "react";
import {Checkbox, Select} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";

const {Option} = Select;

class OfferRowCombo extends Component {
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
			this.props.selectedOffer && typeof this.props.selectedOffer === 'function' && this.props.selectedOffer(company, this.state.offerSelected)
		})
	}
	
	onCollapseToggle = () => {
		this.setState({rowsCollapsed: !this.state.rowsCollapsed})
	}

	creditChange = () => {
		console.log('creditChange');
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
		const {offers, logo, name, info, credit, company, completed, waiting, allowCheck, osago, showMore, lastRow} = this.props
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
							<tr key={i} className={(showOptions ? "expanded" : "") + ((offerSelected && !(completed || waiting)) ? " selected" : "") + (lastRow && !showOptions ? ' last-row': '')}>
								<td className={(lastRow ? '' : 'no-bdr-bottom')}>
									{i === 0 ? <div className={"offer-row__logo" + (info ? " info" : "")}>{name || ''}</div> : null}
								</td>
								<td>
									<div className="offer-row__name">{o.type}</div>
									{(this.state.rowsCollapsed && i === 0 && offers.length > 1) ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{moreLink}</div> : null}
									{(!this.state.rowsCollapsed && (i === offers.length - 1) && offers.length > 1) ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{lessLink}</div> : null}
								</td>

								<td>
									<div className="offer-row__fee text_left">{o.name}</div>
								</td>

								<td className="text_right">
									<div className="offer-row__price">
										{o.megashare ? <div className="offer-row__price-megashare">{o.megashare}</div> : null}
										{(o.price)}</div>
									{o.share ? <div className="offer-row__price-small">{(o.share)}</div> : null}
								</td>

								<td>
									<div className="offer-row__fee">{(o.dealerFee)}</div>
								</td>
								
								<td>
									<div className="offer-row__fee">
										<Checkbox disabled={completed || waiting || o.credit === null} defaultChecked={o.credit ? "checked" : null} onChange={this.creditChange}/>
										
										{/*{o.payment && Array.isArray(o.payment) && o.payment.length > 1 ?*/}
										{/*	<Select*/}
										{/*		size="small"*/}
										{/*		defaultValue={o.payment[0]}*/}
										{/*		dropdownClassName="select_dropdown_v1"*/}
										{/*		className={"w_100p small_select"}*/}
										{/*		placeholder=""*/}
										{/*	>*/}
										{/*		{o.payment.map((e, i) =>*/}
										{/*			<Option key={i} value={e}>{e}</Option>)}*/}
										{/*	</Select>*/}
										{/*	:*/}
										{/*	o.payment*/}
										{/*}*/}
									</div>
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
												{o.nobill ? null : <div className="offer-row__bill gl_link">Счет на оплату</div>}
											</div>
										</td>
										<td>
											<div className={"offer-row__status " + (completed ? "approved" : "waiting")}/>
										</td>
									</>
									: 
									<>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>
											<Checkbox disabled={((allowCheck || osago) ? null : "disabled")} className="offer-row__check" onChange={(e) => this.onSelectOfferToggle(company, i, e)}/>
										</td>
									</>
								}

								<td>
									{'options' in o && o.options.length ? <div onClick={() => this.addOptionFlag(i)} className="offer-row__link"/> : <>&nbsp;</>}
								</td>
							</tr>
							{showOptions && 'options' in o && o.options.length ?
								<tr key={i + 100000} className={(offerSelected ? "selected" : "") + (lastRow ? ' last-row' : '')}>
									<td colSpan={(completed || waiting) ? 2 : 3}>&nbsp;</td>
									<td colSpan={(completed || waiting) ? 7 : 6}>
										<p className="text_left" style={{marginBottom: '15px'}}>Условия КАСКО:</p>
										<ul className="offer-row__options">
											{o.options.map((opt, k) => <li key={k}>{opt}</li>)}
										</ul>
									</td>
									<td>&nbsp;</td>
								</tr>
								: null}
						</> : null)
				})}
			</>
		);
	}
}

export default OfferRowCombo;
