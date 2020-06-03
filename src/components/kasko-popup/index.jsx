import React, {Component} from "react";
//import {Checkbox, Col, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
//import KaskoCarSelect from "../kasko-car-select";
import OfferSelect from "../offer-select";

class KaskoPopup extends Component {
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

		if (step > 1) {
			driverOptions = ['Фомин Сергей М.', 'Фомина Алла К.', 'Фомина Марина Ф.']
		}
		
		return (
			<div className="calculation-popup">
				<div className="calculation-popup__close" onClick={popupCloseFunc}/>

				<OfferSelect imageCallback={this.imageCallback} image={false} popup={true} />
			</div>
		);
	}
}

export default KaskoPopup;
