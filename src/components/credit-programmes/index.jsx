import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import OfferRow from "../offer-row";
import CreditOfferRow from "../credit-offer-row";

class CreditProgrammes extends Component {
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
		const {offersList, selectedOffer, completed, waiting, allowCheck, headMenu} = this.props
		
		return (
			<div className="calculation-offers">
				{headMenu ?
					<div className="calculation-offers__menu">
						<ul className="calculation-offers__menu-list">
							<li><span className="gl_link">Подать заново</span></li>
							<li><span className="gl_link">Отказ клиента</span></li>
							<li><span className="gl_link color_gray">Выбрать все</span></li>
						</ul>
					</div>
					: null
				}
				<table className="calculation-offers__table">
					<thead>
						<tr>
							<th className={"calculation-offers__table--col-1" + (" wide") + ((completed || waiting) ? " small" : "")}
								>Банк<br /> Программа</th>
							<th className={"calculation-offers__table--col-4 text_center" + ((completed || waiting) ? " small" : "")}>Платеж в мес.</th> 
							<th className={"calculation-offers__table--col-9" + ((completed || waiting) ? " small" : "")}>Ставка</th>
							<th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Доход <br />дилера</th>
							<th className={"calculation-offers__table--col-7" + ((completed || waiting) ? " small" : "")}>Страховые&nbsp;продукты</th>
							<th className="calculation-offers__table--col-4-1">&nbsp;</th>
							<th className="calculation-offers__table--col-5">Выбрать</th>
							<th className="calculation-offers__table--col-6">&nbsp;</th>
						</tr>
					</thead>
					
					{offersList && offersList.length ?  
						<tbody>
							{offersList.map((o, i) => {
									return (<CreditOfferRow allowCheck={allowCheck} name={o.name} 
													  completed={completed} waiting={waiting} selectedOffer={selectedOffer}
													  key={i} company={i} offers={o.offers}/>)
								})
							}
						</tbody>
						: null
					}
					
				</table>
			</div>
		);
	}
}

export default CreditProgrammes;
