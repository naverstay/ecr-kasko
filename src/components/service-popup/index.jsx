import React, {Component} from "react";
import {Checkbox, Col, Row, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
//import KaskoCarSelect from "../kasko-car-select";
import KaskoCarSelectNew from "../kasko-car-select-new";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";
//import ClientInfo from "../client-info";
import ClientInfoNew from "../client-info-new";
import DriverCount from "../driver-count";
import KaskoCarSelectOsago from "../kasko-car-select-osago";
import ServiceCarSelect from "../service-car-select";
import CreditDriverInfo from "../credit-driver-info";

class ServicePopup extends Component {
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
				"Hyundai",
				"Mazda",
				//"Mercedes-Benz"
			],
			modelList: [
				"Sonata",
				"Solaris",
				"CX-5",
				"CX-9"
			],
			equipmentList: [
				"2.0 MPI - 6AT",
				"Comfort",
				"Sport",
				"Executive",
				"GT S Sports Car"
			],
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		popupCloseFunc: PropTypes.func,
		updatePaymentState: PropTypes.func,
		fullCalculation: PropTypes.bool,
		offersList: PropTypes.array,
	};

	onUseOCRChange = e => {
		this.setState({
			useOCR: e.target.checked,
		});
	};

	formSave = () => {
		typeof this.props.popupCallback === 'function' && this.props.popupCallback(true)
	}

	formCancel = () => {
		typeof this.props.popupCallback === 'function' && this.props.popupCallback(false)
	}

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
		let {popupCloseFunc, step, allFields, updatePaymentState, osago} = this.props

		let driverOptions = [];

		if (step > 1 || this.state.showCalculationOffers) {
			driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
		}
		
		return (
			<div className="calculation-popup">
				<div className="calculation-popup__close" onClick={popupCloseFunc}/>
				
				<h1 onClick={allFields ? this.onToggleCarFields : null} className={"kasko-main__title" + (allFields ? (this.state.showCarFields ? " expanded" : " collapsed") : "")}>Автомобиль</h1>
			
				<ServiceCarSelect hideOffers={true} allFields={false} expanded={true} fullCalculation={true}/>
				
				<h1 onClick={allFields ? this.onToggleClientFields : null} className={"kasko-main__title" + (allFields ? (this.state.showClientFields ? " expanded" : " collapsed") : "")}>Анкета клиента</h1>
				
				{((step === void 0) || (step !== 2) || this.state.showClientFields) ?
					<>
						<div className={"kasko-car-select__controls ant-row-center align_center"}>
							<Checkbox checked={this.state.useOCR ? "checked" : null}
									  onChange={this.onUseOCRChange}>Не распознавать документы</Checkbox>
						</div>
						<ClientQuestionnaire/>
					</>
					: null
				}

				<CreditDriverInfo familyInfo={false} professionalActivity={false} incomesExpenses={false} contactsFull={false}
								  additioanalChecks={false}
								  expanded={(step !== 2) || this.state.showClientFields}
								  fullCalculation={this.state.fullCalculation}/>

				<Row gutter={20} className="kasko-car-select__controls">
					<Col span={3}/>
					<Col span={3}>
						<div onClick={() => {this.formCancel()}} className="ant-btn btn_green fz_14 w_100p"
						>Отмена</div>
					</Col>
					<Col span={12}>
						<div onClick={() => this.formSave()}
							 className={"ant-btn ant-btn-primary btn_middle w_100p"}
						>Сохранить и оформить карты</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ServicePopup;
