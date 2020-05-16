import React, {Component} from "react";
import {Checkbox, Col, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
//import KaskoCarSelect from "../kasko-car-select";
import KaskoCarSelectNew from "../kasko-car-select-new";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";
import ClientInfo from "../client-info";
import ClientInfoNew from "../client-info-new";
import DriverCount from "../driver-count";

class CalculationPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: this.props.fullCalculation || false,
			showClientFields: false,
			toggleClientFields: false,
			calculationPopupOpened: false,
			formBusy: false,
			useOCR: false,
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
		fullCalculation: PropTypes.bool,
		offersList: PropTypes.array,
	};

	onUseOCRChange = e => {
		this.setState({
			useOCR: e.target.checked,
		});
	};

	onToggleClientFields = e => {
		this.setState({
			showClientFields: !this.state.showClientFields
		});
	};

	onToggleCarFields = e => {
		this.setState({
			showCarFields: !this.state.showCarFields
		});
	};

	onCalculationTypeChange = (checked) => {
		this.setState({fullCalculation: checked})
	}

	onOtherChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}

	render() {
		let {popupCloseFunc, step, allFields} = this.props

		let driverOptions = [];

		if (step > 1) {
			driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
		}

		return (
			<div className="calculation-popup">
				<div className="calculation-popup__inner">
					<div className="calculation-popup__close" onClick={popupCloseFunc}/>

					<div className={"kasko-car-select__calculation" + (this.state.fullCalculation ? ' active' : '')}>
						<span className="kasko-car-select__calculation--text">Предварительный расчет</span>
						<Switch checked={this.state.fullCalculation} className="kasko-car-select__calculation--switch" onChange={this.onCalculationTypeChange}/>
						<span className="kasko-car-select__calculation--text">Окончательный расчет</span>
					</div>

					{
						allFields ?
							<>
								<h1 className="kasko-main__title">Поля к заполнению</h1>
								{/*<ClientInfo fullCalculation={this.state.fullCalculation}/>*/}
								<ClientInfoNew fullCalculation={this.state.fullCalculation}/>
							</>
							: ""
					}
					
					<h1 onClick={allFields ? this.onToggleCarFields : null} className={"kasko-main__title" + (allFields ? (this.state.showCarFields ? " expanded" : " collapsed") : "")}>Автомобиль</h1>
					
					{/*<KaskoCarSelect hideOffers={true} allFields={true}/>*/}
					<KaskoCarSelectNew hideOffers={true} allFields={allFields} fullCalculation={this.state.fullCalculation}/>

					<h1 onClick={allFields ? this.onToggleClientFields : null} className={"kasko-main__title" + (allFields ? (this.state.showClientFields ? " expanded" : " collapsed") : "")}>Анкета клиента</h1>

					<div className={"kasko-car-select__controls ant-row-center align_center"}>
						<Checkbox checked={this.state.useOCR ? "checked" : null}
								  onChange={this.onUseOCRChange}>Не распознавать документы</Checkbox>
					</div>
					
					<ClientQuestionnaire/>
					
					<DriverCount step={step} driverOptions={driverOptions}/>
					
					<DriverInfo fullCalculation={this.state.fullCalculation} />

				</div>
			</div>
		);
	}
}

export default CalculationPopup;