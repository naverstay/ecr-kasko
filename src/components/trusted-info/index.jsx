import React, {Component} from "react";
import {Input, Col, Row, Select, Checkbox, Button} from "antd";
import './style.scss';
import PropTypes from "prop-types";

import InsurancePolicy from "../insurance-policy";
import {Link} from "react-router-dom";
import Inputmask from "inputmask";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import FormCheckbox from "../form-checkbox";

const {Option} = Select;

class TrustedInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFields: [],
            clientLicenseDepartment: '',
            clientAddress: '',
            clientFlat: '',
            clientPostCode: '',
            clientRegistrationStart: '',
            clientLicenseStart: '',
            clientLicenseDepID: '',
            clientLicenseID: '',
            clientLicenseNumber: '',
            driverPassport: '',
            driverPassportStart: '',
            driverAnotherDocument: '',
            driverAnotherDocumentStart: '',
            driverAnotherDocumentDepartment: '',
            driverPassportDepID: '',
            driverPassportDepartment: '',
            driverBirthLocation: '',
            driverAddress: '',
            driverAddressPostCode: '',
            nonChangedPassportApproval: false,
            driverLicensePrev: false,
            driverProgenyNess: false,
            driverLastName: '',
            driverFirstName: '',
            driverFarthersName: '',
            driverPhone: '',
            driverEmail: '',
            driverLicenseStart: '',
            driverExperienceStart: '',
            driverLicenseFirst: '',
            driverBirthday: '',
            driverRegistrationStart: '',
            driverLicenseDepartment: '',
            driverLicenseID: '',
            driverLicenseNumber: '',
            driverPrevLicenseStart: '',
            driverPrevLicenseID: '',
            driverPrevLicenseNumber: '',
            driverChildrenCount: '',
            driverOSAGOInsurant: false,
            driverInsuranceAdd: true,
            driverOSAGOOwner: false,
            driverCitizenRF: true,
            sameAsRealAddress: true,
            driverCount: 1,
            clientFlatType: '',
            driverSecondDocType: '',
            driverFamilyStatus: '',
            driverFamilyStatusList: [
                "Женат/Замужем",
                "Холост",
                "В разводе",
                "Вдовец"
            ],
            clientFlatTypeList: [
                "Дом",
                "Квартира"
            ],
            driverSecondDocTypeList: [
                "Водительское удостоверение",
                "Военный билет"
            ]
        };
    }

    static propTypes = {
        children: PropTypes.node,
        fullCalculation: PropTypes.bool,
        innerWidth: PropTypes.number
    };

    removeDriver = (index) => {
        let drv = this.state.driverCount

        drv--

        this.setState({driverCount: (drv || 1)})
    };

    addDriver = e => {
        let drv = this.state.driverCount

        drv++

        this.setState({driverCount: (drv)})
    };

    driverInfoSave = (value) => {
        if ('calculationSave' in this.props) this.props.calculationSave(value)
    };

    onDriverPrevLicenseIDChange = e => {
        this.setState({driverPrevLicenseID: e.target.value})
    };

    onDriverLicenseNumberPrevChange = e => {
        this.setState({driverPrevLicenseNumber: e.target.value})
    };

    onDriverPrevLicenseStartChange = e => {
        this.setState({driverPrevLicenseStart: e.target.value})
    };

    addActiveField = (field) => {
        setTimeout(() => {
            let fields = this.state.activeFields.slice(0)

            if (fields.indexOf(field) < 0) {
                fields.push(field)

                this.setState({activeFields: fields})
            }
        }, 100)
    };

    activeClass = (field) => {
        return (this.state.activeFields.indexOf(field) > -1 ? " control-focused" : "")
    };

    formControlCallback = (name, value) => {
        console.log('formControlCallback', name, value);

        if (name in this.state) {
            let obj = {}
            obj[name] = value

            this.setState(obj)
        } else {
            switch (name) {
                case 'carForTaxi':
                    this.setState({carForTaxi: value})
                    break

            }
        }
    };

    componentDidUpdate() {
        document.querySelectorAll('[data-inputmask]').forEach(function (inp) {
            let mask = {}
            inp.dataset.inputmask.split(',').forEach((m) => {
                let key = m.split(':')[0]
                mask[key] = m.split(':')[1]
            })
            Inputmask(mask).mask(inp);
        })
    };

    render() {
        let {fullCalculation, allFields, expanded, osago, wholeName, showAddBlock} = this.props
        //const dateFormat = "DD.MM.YY"
        const dateFormatMask = "'mask': '99.99.9999', 'showMaskOnHover': 'false'"
        const driverPhoneMask = "'mask': '[+7] (999)-999-99-99', 'showMaskOnHover': 'false'"
        const driverEmailMask = "'alias': 'email', 'showMaskOnHover': 'false'"
        const driverLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
        const driverLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"

        const clientLicenseIDMask = "'mask': '99 99', 'showMaskOnHover': 'false'"
        const clientLicenseNumberMask = "'mask': '999999', 'showMaskOnHover': 'false'"

        let drivers = []

        for (let drv = 0; drv < this.state.driverCount; drv++) {
            drivers.push(drv)
        }

        //if (showAddBlock) {
        //	drivers.push(drivers.length)
        //}

        return (
            <div className="driver-info">
                <div className="driver-info__item">
                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                        <Col span={3}/>
                        <Col span={6}>
                            <div className="driver-info__caption">Водитель #1</div>
                        </Col>
                        <Col span={6}>
                            <div className="driver-info__remove m_0 gl_link"/>
                        </Col>
                    </Row>

                    <Row className="kasko-car-select__controls" gutter={20}>
                        <Col span={3}/>

                        {wholeName ?
                            <FormInput span={18} onChangeCallback={this.formControlCallback}
                                       placeholder="Фамилия, Имя, Отчество" controlName={'clientWholeName'} value={''}/>
                            :
                            <>
                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Фамилия" controlName={'driverLastName'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Имя" controlName={'driverFirstName'} value={''}/>

                                <FormInput span={6} onChangeCallback={this.formControlCallback}
                                           placeholder="Отчество" controlName={'driverFarthersName'} value={''}/>
                            </>
                        }
                    </Row>

                    <Row className="kasko-car-select__controls" gutter={20}>
                        <Col span={3}/>
                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   placeholder="Дата рождения" controlName={'driverBirthday'} value={''}/>
                        {/*<FormInput span={6} onChangeCallback={this.formControlCallback}*/}
                        {/*           placeholder="Мобильный телефон"*/}
                        {/*           controlName={'driverPhone'} value={this.state.driverPhone}/>*/}
                    </Row>

                    {/*<Row className="kasko-car-select__controls" gutter={20}>*/}
                    {/*    <Col span={3}/>*/}
                    {/*    <FormSelect span={6} onChangeCallback={this.formControlCallback}*/}
                    {/*                options={this.state.driverFamilyStatusList}*/}
                    {/*                className={this.activeClass('driverFamilyStatus')}*/}
                    {/*                placeholder="Отношение к клиенту" controlName={'driverFamilyStatus'}*/}
                    {/*                value={this.state.driverFamilyStatus}/>*/}

                    {/*    <FormCheckbox onChangeCallback={this.formControlCallback}*/}
                    {/*                  text="Добавить в полис ОСАГО или КАСКО"*/}
                    {/*                  className="checkbox_middle check_v3"*/}
                    {/*                  value={0}*/}
                    {/*                  controlName={'driverInsuranceAdd'} checked={this.state.driverInsuranceAdd}/>*/}
                    {/*</Row>*/}

                    <Row className="kasko-car-select__controls" gutter={20}>
                        <Col span={3}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   inputmask={clientLicenseIDMask}
                                   placeholder="Серия, номер ВУ"
                                   controlName={'driverAnotherDocument'} value={this.state.driverAnotherDocument}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   inputmask={clientLicenseIDMask}
                                   placeholder="Дата выдачи ВУ"
                                   controlName={'driverAnotherDocumentStart'}
                                   value={this.state.driverAnotherDocumentStart}/>

                        <FormInput span={6} onChangeCallback={this.formControlCallback}
                                   placeholder="Дата начала стажа"
                                   controlName={'driverExperienceStart'}
                                   value={this.state.driverExperienceStart}/>
                    </Row>

                    {/*<Row className="kasko-car-select__controls mb_0" gutter={20}>*/}
                    {/*    <Col span={3}/>*/}
                    {/*    <FormInput span={18} onChangeCallback={this.formControlCallback}*/}
                    {/*               placeholder="Кем выдано ВУ"*/}
                    {/*               controlName={'driverAnotherDocumentDepartment'}*/}
                    {/*               value={this.state.driverAnotherDocumentDepartment}/>*/}
                    {/*</Row>*/}

                    <Row className="kasko-car-select__controls mb_0" gutter={20}>
                        <Col span={3}/>
                        <FormCheckbox onChangeCallback={this.formControlCallback}
                                      text="Страхователь"
                                      className="checkbox_middle check_v3"
                                      value={0}
                                      controlName={'driverOSAGOInsurant'} checked={this.state.driverOSAGOInsurant}/>

                        <FormCheckbox onChangeCallback={this.formControlCallback}
                                      text="Собственник"
                                      className="checkbox_middle check_v3"
                                      value={1}
                                      controlName={'driverOSAGOOwner'} checked={this.state.driverOSAGOOwner}/>
                    </Row>

                </div>

                {/*<div className="kasko-car-select__controls ant-row-center">*/}
                {/*	<div className="driver-info__add gl_link">Добавить водителя</div>*/}
                {/*</div>*/}

                {/*<div className="kasko-car-select__controls ant-row-center">*/}
                {/*	<div className="kasko-car-select__controls--group">*/}
                {/*		<div className="kasko-car-select__controls--group-l">*/}
                {/*			<div onClick={() => this.driverInfoSave(false)} className={"gl_link"}>Отмена</div>*/}
                {/*		</div>*/}
                {/*		<div onClick={() => this.driverInfoSave(true)} className={"ant-btn ant-btn-primary btn_middle"}>Получить расчет</div>*/}
                {/*	</div>*/}
                {/*</div>*/}

            </div>
        );
    }
}

export default TrustedInfo;
