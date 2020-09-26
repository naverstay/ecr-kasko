import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import OfferRow from "../offer-row";

class CreditAdditionals extends Component {
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
		const {additionalList} = this.props
		
		return (
			<ul className="credit-additional__list">
				{additionalList.map((a, i) => <li key={i} >
						<div className="credit-additional__item">
							<div className="credit-additional__remove"/>
							<div className="credit-additional__item--title">{a.title}</div>
							
							{(a.additionals && a.additionals.length) ? <ul className="credit-additional__options">
								{a.additionals.map((option) => <li className={"credit-additional__option" + (option.short ? " short" : "")}>{option.option}</li>)}
							</ul> : ""}
							
						</div>
					</li>
					
					)
				
				}
			</ul>
		);
	}
}

export default CreditAdditionals;
