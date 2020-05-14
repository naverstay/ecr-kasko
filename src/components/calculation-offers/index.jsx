import React, {Component} from "react";
import {Checkbox} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import OfferRow from "../offer-row";

class CalculationOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		popupCloseFunc: PropTypes.func,
		offersList: PropTypes.array,
	};

	render() {
		const {offersList} = this.props
		
		return (
			<div className="calculation-offers">
				<table className="calculation-offers__table">
					<thead>
					<tr>
						<th className="calculation-offers__table--col-1">Страховая компания</th>
						<th className="calculation-offers__table--col-2">Тариф</th>
						<th className="calculation-offers__table--col-3">Стоимость</th>
						<th className="calculation-offers__table--col-4">Доход <br />дилера</th>
						<th className="calculation-offers__table--col-5">Выбрать</th>
						<th className="calculation-offers__table--col-6">&nbsp;</th>
					</tr>
					</thead>
					<tbody>
					
					{offersList.map((o, i) => {
						
						
						return (<OfferRow key={i} logo={o.logo} offers={o.offers} />)
					})}
					
					</tbody>
				</table>
			</div>
		);
	}
}

export default CalculationOffers;