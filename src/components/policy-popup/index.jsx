import React, {Component} from "react";
import {Button, Checkbox, Col, Row, Switch} from "antd";

import './style.scss';
import PropTypes from "prop-types";
//import KaskoCarSelect from "../kasko-car-select";
import KaskoCarSelectNew from "../kasko-car-select-new";
import ClientQuestionnaire from "../client-questionnaire";
import DriverInfo from "../driver-info";
import ClientInfo from "../client-info";
import ClientInfoNew from "../client-info-new";
import DriverCount from "../driver-count";
import KaskoCarSelectOsago from "../kasko-car-select-osago";
import KaskoCarSelect from "../kasko-car-select";
import PolicyUpload from "../policy-upload";
import FormCheckbox from "../form-checkbox";
import PolicyForm from "../policy-form";
import PersonalForm from "../personal-form";

class PolicyPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carFound: void 0,
			fullCalculation: this.props.fullCalculation || false,
			showUpload: false,
			showKasko: false,
			showOsago: false,
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
		popupConfirmation: PropTypes.func,
		fullCalculation: PropTypes.bool,
		offersList: PropTypes.array,
	};

	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);
		
		if (name in this.state) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
		}

		switch (name) {
			case 'carModel':
				this.removeActiveField('carModel')
				this.addActiveField('carEquipment')
				break
			case 'carEquipment':
				this.removeActiveField('carEquipment')

				if (!this.state.newCar) {
					this.addActiveField('carYear')
				}
				break
			case 'carYear':
				this.removeActiveField('carYear')
				this.addActiveField('carNumber')
				break
		}
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

	toggleShowUpload = () => {
		this.setState({showUpload: !this.state.showUpload})
	}

	popupConfirmFunc = () => {
		this.props.popupConfirmation && typeof this.props.popupConfirmation === 'function' && this.props.popupConfirmation()
	}

	render() {
		let {popupCloseFunc, step, allFields} = this.props
		
		return (
			<div className="calculation-popup">
				<div className="calculation-popup__close" onClick={popupCloseFunc}/>
				<h1 className="kasko-main__title">Внести полис вручную</h1>

				<h1 onClick={allFields ? this.onToggleCarFields : null} className={"kasko-main__title" + (allFields ? (this.state.showCarFields ? " expanded" : " collapsed") : "")}>Автомобиль</h1>
				
				<KaskoCarSelect popup={true} hideOffers={true} allFields={allFields} expanded={(step === void 0) || this.state.showCarFields} fullCalculation={this.state.fullCalculation}/>
				
				<h1 onClick={allFields ? this.onToggleClientFields : null} className={"kasko-main__title" + (allFields ? (this.state.showClientFields ? " expanded" : " collapsed") : "")}>Страховой полис</h1>

				<Row gutter={20} className={"kasko-car-select__controls check_v2 ant-row-center align_center"}>
					<FormCheckbox onChangeCallback={this.formControlCallback}
								  text="КАСКО"
								  className=""
								  value={1}
								  controlName={'showKasko'}
								  checked={this.state.showKasko ? true : null}/>
								  
					<FormCheckbox onChangeCallback={this.formControlCallback}
								  text="ОСАГО"
								  className=""
								  value={1}
								  controlName={'showOsago'}
								  checked={this.state.showOsago ? true : null}/>
				</Row>

				{this.state.showKasko ?
					<>
						<div className={"kasko-car-select__caption"}>Полис КАСКО</div>
						<PolicyForm/>
					</>
					: null
				}

				{this.state.showOsago ?
					<>
						<div className={"kasko-car-select__caption"}>Полис ОСАГО</div>
						<PolicyForm/>
					</>
					: null
				}

				{(this.state.showKasko || this.state.showOsago) ? 
					<div onClick={this.toggleShowUpload}
						className={"kasko-car-select__caption" + (this.state.showUpload ? " expanded" : " collapsed")}
						>Загрузить полис</div> 
					: null
				}

				{this.state.showUpload && (this.state.showKasko || this.state.showOsago) ?
					<PolicyUpload kasko={this.state.showKasko} osago={this.state.showOsago}/>
					: null
				}

				<div className={"kasko-car-select__caption"}>Личные данные</div>

				<PersonalForm/>
				
				<Row className="kasko-car-select__controls" gutter={20}>
					<Col span={6}/>
					<Col span={3}>
						<div className="ant-btn btn_green fz_14">Отменить</div>
					</Col>
					<Col span={6}>
						<Button onClick={this.popupConfirmFunc} 
							className={"w_100p " + (this.state.formBusy ? "btn_grey" : "ant-btn-primary")}
							>Сохранить</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default PolicyPopup;
