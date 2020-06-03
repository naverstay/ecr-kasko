import React, {Component} from "react";
import Inputmask from "inputmask";
import {Input, Col, Row, Select, Button, Checkbox, Form, Radio, Slider} from "antd";
import './style.scss';
import PropTypes from "prop-types";
import moment from 'moment';
import ru from 'moment/locale/ru';
import KaskoOffers from "../kasko-offers";
import {formatMoney} from "../../helpers/formatMoney";
import {Link} from "react-router-dom";

const {Option} = Select;
//const {YearPicker} = DatePicker;

moment().locale('ru', ru);

class CreditSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creditValue: 50
		};
	}

	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number,
		onSliderChange: PropTypes.func,
		step: PropTypes.number
	};

	onChange = value => {
		this.setState({
			creditValue: value,
		});
		
		if (typeof this.props.onSliderChange === 'function') this.props.onSliderChange(value)
	};

	onCreditTooltip = value => {
		return <div className="credit-slider__values">
			<div className="credit-slider__value credit-slider__value--left">{value}</div>
			<div className="credit-slider__value credit-slider__value--right">{this.props.creditMax - value}</div>
		</div>
	};
	
	offersUpdate = (offer) => {
		let activeOffers = this.state.activeOffers

		if (offer.active) {
			activeOffers.push(offer.id)
		} else {
			const index = activeOffers.indexOf(offer.id);
			if (index > -1) {
				activeOffers.splice(index, 1);
			}
		}

		this.setState({
			activeOffers: activeOffers,
			paramsChanged: true
		});
	};
	
	componentDidMount() {
		this.props.allFields && this.setState({showAdditional: true, newCar: false})
	}

	componentDidUpdate() {
		document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
			let mask = {}
			inp.dataset.inputmask.split(',').forEach((m) => {
				let key = m.split(':')[0]
				mask[key] = m.split(':')[1]
			})
			Inputmask(mask).mask(inp);
		})
		
		document.querySelectorAll('[data-inputmask-date]').forEach(function (inp) {
			Inputmask({
				placeholder : '_',
				showMaskOnHover : false,
				regex: String.raw`^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`
			}).mask(inp);
		})
	};

	updateImage = (img) => {
		if ('imageCallback' in this.props && this.state.carFound && (typeof this.props.imageCallback === 'function')) this.props.imageCallback(img)
	};
	
	render() {
		const {step, creditMin, creditMax} = this.props;
		let {image} = this.props;
		let node;
		
		return (
			<div className="credit-slider__holder">
				<div className={"kasko-car-select__image" + (step === 1 && !this.state.allowPayment ? " _inactive__" : "")}>
					<img src={'./cars/' + image + '.png'} alt=""/>
				</div>
				<div className="credit-slider__tooltip" ref={el => node = el}/>
				<Slider className="credit-slider"
						step={1}
						tooltipVisible={true}
						min={creditMin}
						max={creditMax}
						getTooltipPopupContainer={() => node}
						tipFormatter={this.onCreditTooltip}
						onChange={this.onChange}
						defaultValue={50}/>
			</div>
		);
	}
}

export default CreditSlider;
