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
		const {offersList, selectedOffer, completed, waiting, allowCheck, osago, franchise} = this.props
		
		return (
			<div className="calculation-offers">
				<table className="calculation-offers__table">
					<thead>
						<tr>
							<th className={"calculation-offers__table--col-1" + (osago ? " wide" : "") + ((completed || waiting) ? " small" : "")}>Страховая компания</th>
							{!osago ? <th className={(franchise ? "calculation-offers__table--col-10" : "calculation-offers__table--col-2") + ((completed || waiting) ? " small" : "")}>Тариф</th> : ""}
							{(!osago && franchise) ? <th className={"calculation-offers__table--col-9" + ((completed || waiting) ? " small" : "")}>Франшиза</th> : null}
							<th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Стоимость</th>
							<th className={"calculation-offers__table--col-4" + ((completed || waiting) ? " small" : "")}>Доход <br />дилера</th>
							{(completed || waiting) ?
								<>
									<th className="calculation-offers__table--col-8">Срок <br/>действия</th>
									<th className="calculation-offers__table--col-7 text_left">Полис</th>
									<th className="calculation-offers__table--col-6">Статус <br/>выпуска</th>
								</>
							:
								<>
									<th className="calculation-offers__table--col-4-1">&nbsp;</th>
									<th className="calculation-offers__table--col-5">Выбрать</th>
									{!osago ? <th className="calculation-offers__table--col-6">&nbsp;</th> : null}
								</>
							}
						</tr>
					</thead>
					
					{offersList.length ? 
						<tbody>{offersList.map((o, i) => {
								return (<OfferRow franchise={!osago && franchise} allowCheck={allowCheck} osago={osago}
												  completed={completed} waiting={waiting} selectedOffer={selectedOffer}
												  key={i} company={i} logo={o.logo} offers={o.offers}/>)
							})}</tbody>: null}
						
				</table>
				{!osago && waiting ?
					<div className="kasko-offer__more">
						<div className="gl_link">Показать все предложения</div>
					</div>
					: null
				}
			</div>
		);
	}
}

export default CalculationOffers;
