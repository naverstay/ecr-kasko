import React, {Component} from "react";
import {Checkbox, Col} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import plural from "../../helpers/plural";

class OfferRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsCollapsed: true
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		offers: PropTypes.array,
	};
	
	onCollapseToggle = () => {
		this.setState({rowsCollapsed: !this.state.rowsCollapsed})
	}

	render() {
		const {offers, logo} = this.props
		const moreLink = 'еще ' + (offers.length - 1) + ' ' + plural(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))
		
		return (
			<>
				{offers.map((o, i) => {
					const show = (i === 0 || !this.state.rowsCollapsed)
					
					return (show ? <tr key={i} className="">
							<td>
								{i === 0 ? <div className="offer-row__logo"><img src={logo} alt=""/></div> : ""}
							</td>
							<td>
								<div className="offer-row__name">{o.name}</div>
								{i === 0 ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{moreLink}</div> : ""}
							</td>
							<td>
								<div className="offer-row__price">{o.price} ₽</div>
							</td>
							<td>
								<div className="offer-row__fee">{o.price}</div>
							</td>
							<td>
								<Checkbox />
							</td>
							<td>
								<div className="offer-row__link" />
							</td>
						</tr> : ""
					)
				})}
			</>
		);
	}
}

export default OfferRow;

