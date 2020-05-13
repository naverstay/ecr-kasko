import React, {Component} from "react";
import {Checkbox, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import KaskoCarSelect from "../kasko-car-select";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";

class CalculationPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: false,
			calculationPopupOpened: false,
			formBusy: false,
			hasFranchise: true,
			carCredit: true,
			carMark: '',
			carPrice: 0,
			carModel: '',
			carEquipment: '',
			carNumber: '',
			carYear: '',
			markList: [
				"BMW",
				"Honda",
				"Lotus",
				"Mercedes-Benz"
			],
			modelList: [
				"M3",
				"Accord",
				"100500",
				"GT S Sports Car"
			],
			equipmentList: [
				"Comfort",
				"Sport",
				"Executive",
				"GT S Sports Car"
			]
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		popupCloseFunc: PropTypes.func,
		offersList: PropTypes.array,
	};
		
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	onCalculationTypeChange = (checked) => {
		this.setState({fullCalculation: checked})
	}

	onOtherChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}

	render() {
		let {popupCloseFunc} = this.props

		const otherOptions = ['Мультидрайв'];

		return (
			<div className="calculation-popup">
				<div className="calculation-popup__inner">
					<div className="calculation-popup__close" onClick={popupCloseFunc}/>

					<div className={"kasko-car-select__calculation" + (this.state.fullCalculation ? ' active' : '')}>
						<span className="kasko-car-select__calculation--text">Предварительный расчет</span>
						<Switch className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
						<span className="kasko-car-select__calculation--text">Окончательный расчет</span>
					</div>

					<h1 className="kasko-main__title">Автомобиль</h1>
					
					<KaskoCarSelect allFields={true}/>

					<h1 className="kasko-main__title">Анкета клиента</h1>

					<ClientQuestionnaire />

					<div className="kasko-car-select__controls check_v2">
						<Checkbox.Group options={otherOptions} onChange={this.onOtherChange}/>
					</div>

					<DriverInfo />

				</div>
			</div>
		);
	}
}

export default CalculationPopup;