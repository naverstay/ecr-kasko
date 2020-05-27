import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import OfferRow from "../offer-row";
import {Select} from "antd";

const {Option} = Select;

class CreditOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOffers: [],
			showPayment: true,
			showCompare: false,
			availablePayment: false
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		popupCloseFunc: PropTypes.func,
		offersList: PropTypes.array,
	};

	updateSelectedOffer = (company, offers) => {
		let offerList = this.state.selectedOffers;
		let compare = true;

		let companyOffers = offerList.find((c) => c.company === company)

		if (companyOffers) {
			for (let o in offers) {
				if (offers.hasOwnProperty(o)) {
					let offer = offers[o]

					if (offer) {
						companyOffers.offers.push(o)
					} else {
						const index = companyOffers.offers.indexOf(o + '');
						if (index > -1) {
							companyOffers.offers.splice(index, 1);
						}

						if (!companyOffers.offers.length) {
							for (let i = 0; i < offerList.length; i++) {
								if (offerList[i].company === company) {
									offerList.splice(i, 1)
								}

							}
						}
					}
				}
			}

		} else {
			let arr = []

			for (let o in offers) {
				if (offers.hasOwnProperty(o)) {
					let offer = offers[o]

					if (offer) {
						arr.push(o)
					}
				}
			}

			offerList.push({company: company, offers: arr})
		}

		if (offerList.length === 1) {
			if (offerList[0].offers.length === 1) {
				compare = false
			}
		}

		this.setState({
			selectedOffers: offerList,
			showPayment: true,
			showCompare: offerList.length > 1 && compare,
			availablePayment: offerList.length > 0
		})
	}

	render() {
		const {offersList, selectedOffer, completed, waiting, allowCheck} = this.props
		
		let bankOptions = [
			'Все банки'
		]
		
		return (
			<div className="calculation-offers">
				<table className="calculation-offers__table">
					<thead>
						<tr>
							<th className={"calculation-offers__table--col-1" + ((completed || waiting) ? " small" : "")}>
								<Select
									size="small"
									dropdownClassName="select_dropdown_v1"
									className={"w_100p small_select"}
									placeholder=""
								>
									{bankOptions.map((e, i) =>
										<Option key={i} value={e}>{e}</Option>)}
								</Select>
							</th>
							<th className={"calculation-offers__table--col-2 wide"}>Программа</th>
							<th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Платеж</th>
							<th className={"calculation-offers__table--col-3" + ((completed || waiting) ? " small" : "")}>Ставка</th>
							<th className={"calculation-offers__table--col-4" + ((completed || waiting) ? " small" : "")}>Доход <br />дилера</th>
							<th className="calculation-offers__table--col-4">Параметры<br />кредита</th>
							<th className="calculation-offers__table--col-5">Выбрать</th>
							<th className="calculation-offers__table--col-6">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{offersList.length ? offersList.map((o, i) => {
							return (<OfferRow allowCheck={true} credit={true} selectedOffer={selectedOffer} key={i} company={i} logo={o.logo} info={o.info} name={o.name} offers={o.offers} />)
						}) : ""}
					</tbody>
				</table>
				{waiting ?
					<div className="kasko-offer__more">
						<div className="gl_link">Показать все предложения</div>
					</div>
					: ""
				}
			</div>
		);
	}
}

export default CreditOffers;
