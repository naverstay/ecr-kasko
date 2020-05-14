import React, {Component} from "react";

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
		const {offersList, selectedOffer, completed} = this.props
		
		return (
			<div className="calculation-offers">
				<table className="calculation-offers__table">
					<thead>
						<tr>
							<th className={"calculation-offers__table--col-1" + (completed ? " small" : "")}>Страховая компания</th>
							<th className={"calculation-offers__table--col-2" + (completed ? " small" : "")}>Тариф</th>
							<th className={"calculation-offers__table--col-3" + (completed ? " small" : "")}>Стоимость</th>
							<th className={"calculation-offers__table--col-4" + (completed ? " small" : "")}>Доход <br />дилера</th>
							{completed ?
								<>
									<th className="calculation-offers__table--col-8">Срок <br/>действия</th>
									<th className="calculation-offers__table--col-7 text_left">Полис</th>
									<th className="calculation-offers__table--col-6">Статус <br/>выпуска</th>
								</>
							:
								<>
									<th className="calculation-offers__table--col-5">Выбрать</th>
									<th className="calculation-offers__table--col-6">&nbsp;</th>
								</>
							}
						</tr>
					</thead>
					<tbody>
						{offersList.map((o, i) => {
							return (<OfferRow completed={completed} selectedOffer={selectedOffer} key={i} company={i} logo={o.logo} offers={o.offers} />)
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default CalculationOffers;