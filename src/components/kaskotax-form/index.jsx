import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";
import {Col, Row, Input, Button, Form, Checkbox, Select} from "antd";
import FormSwitch from "../form-switch";
import FormSelect from "../form-select";
import FormInput from "../form-input";

const {Option} = Select;

class KaskotaxForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formBusy: false,
			kaskoCash: false,
			kaskoDealerBank: false,
			kaskoFirstYear: false,
			manualPriceCheck: false,
			insurancePrice: '',
			insuranceCompName: '',
			insuranceTaxName: '',
			clientLastName: '',
			clientPhone: '',
			insuranceCompaniesList: [
				'Зетта-Страхование',
				'Бетта-Страхование',
				'Тетта-Страхование',
				'',
				'Внести вручную'
			],
			insuranceTaxList: [
				'КАСКО базовый',
				'КАСКО супер',
				'КАСКО мега'
			]
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		popupCloseFunc: PropTypes.func,
		innerWidth: PropTypes.number,
	};

	formRef = React.createRef();

	formUpdate = () => {
		
	}
	
	formControlCallback = (name, value) => {
		console.log('formControlCallback', name, value);

		let selects = [
			'carATS',
			'carAutoStart',
			'carBankName',
			'carBodyType',
			'carEquipment',
			'carForTaxi',
			'carMark',
			'carModel',
			'carMotorSize',
			'carMotorType',
			'carNumber',
			'carPower',
			'carPowerRange',
			'carPrice',
			'carPTS',
			'carPTSStart',
			'carRegion',
			'carTransmissionType',
			'carUsageStart',
			'carVIN',
			'carYear',
			'insurancePrice',
			'insuranceTaxName',
			'showAdditional',
		]

		if (selects.indexOf(name) > -1) {
			let obj = {}
			obj[name] = value

			this.setState(obj)
		} else {
			switch (name) {
				case 'insuranceCompName':
					let manual = value === this.state.insuranceCompaniesList[this.state.insuranceCompaniesList.length - 1]
					
					this.setState({
						insuranceCompName: value,
						insuranceTaxName: manual ? '' : this.state.insuranceTaxName,
						manualPriceCheck: manual
					})
					break
				case 'kaskoCash':
					this.setState({kaskoCash: value})
					break
				case 'kaskoDealerBank':
					this.setState({kaskoDealerBank: value})
					break
				case 'kaskoFirstYear':
					this.setState({kaskoFirstYear: value})
					break
			}
		}
		
		setTimeout(() => {
			this.formUpdate()
		})
	};
	
	render() {
		const {className, size} = this.props;
		//const clientPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
		
		let formDisabled = !this.state.insuranceCompName.length || !this.state[(this.state.manualPriceCheck ? 'insurancePrice' : 'insuranceTaxName')].length || this.state.formBusy
		
		return (
			<div className={className || ''}>
				<Row gutter={20} className="kasko-car-select__controls mb_20 ant-row-cente">
					<Col span={24}>
						<FormSwitch controlName="kaskoDealerBank" value={this.state.kaskoDealerBank}
									onChangeCallback={this.formControlCallback}
									leftText="КАСКО дилера" rightText="КАСКО банка"/>
					</Col>
				</Row>
				
				<Row className="kasko-car-select__controls ant-row-center" gutter={20}>
					<FormSelect span={size || 17} onChangeCallback={this.formControlCallback}
								dropdownClassName="select_dropdown_v1 popup"
								options={this.state.insuranceCompaniesList}
								placeholder="Страховая компания" controlName={'insuranceCompName'}
								value={this.state.insuranceCompName}/>
				</Row>
				
				<Row className="kasko-car-select__controls ant-row-center mb_20" gutter={20}>
					{this.state.manualPriceCheck ?
						<FormInput span={size || 17} onChangeCallback={this.formControlCallback}
								   placeholder="Введите стоимость"
								   controlName={'insurancePrice'} value={''}/>
						: <FormSelect span={size || 17} onChangeCallback={this.formControlCallback}
								  dropdownClassName="select_dropdown_v1 popup"
								  options={this.state.insuranceTaxList}
								  placeholder="Тариф" controlName={'insuranceTaxName'}
								  value={this.state.insuranceTaxName}/>
					}
				</Row>

				<Row gutter={20} className="kasko-car-select__controls mb_0 ant-row-cente">
					<Col span={24}>
						<FormSwitch controlName="kaskoFirstYear" value={this.state.kaskoFirstYear}
									onChangeCallback={this.formControlCallback}
									leftText="На первый год" rightText="На весь срок кредита"/>
					</Col>
				</Row>

				<Row gutter={20} className="kasko-car-select__controls mb_20 ant-row-cente">
					<Col span={24}>
						<FormSwitch controlName="kaskoCash" value={this.state.kaskoCash}
									onChangeCallback={this.formControlCallback}
									leftText="В кредит" rightText="Наличные"/>
					</Col>
				</Row>
			</div>
		);
	}
}

export default KaskotaxForm;
